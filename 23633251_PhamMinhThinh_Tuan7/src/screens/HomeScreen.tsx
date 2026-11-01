import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryChips } from "../components/CategoryChips";
import { PriceFilter } from "../components/PriceFilter";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { useDebounce } from "../hooks/useDebounce";
import { filterBooks, type PriceRange } from "../utils/filters";
import { useCart } from "../store/hooks";
import { TabScreenProps } from "../navigation/types";
import { Book, Category } from "../types";
import { colors, radius } from "../theme";

type SortOrder = "asc" | "desc" | null;

export function HomeScreen({ navigation, route }: TabScreenProps<"Home">) {
  const { totalQuantity } = useCart();
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [booksData, categoriesData] = await Promise.all([getBooks(), getCategories()]);
      setBooks(booksData);
      setCategories(categoriesData);
    } catch (e) { setError(getErrorMessage(e)); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  // Tham số chỉ áp dụng một lần, tránh tự lọc lại khi quay về Home.
  useEffect(() => {
    const id = route.params?.categoryId;
    if (id !== undefined) {
      setCategoryId(id);
      navigation.setParams({ categoryId: undefined });
    }
  }, [route.params?.categoryId, navigation]);

  const debouncedKeyword = useDebounce(keyword, 400);
  const visibleBooks = useMemo(() => {
    const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
    if (sortOrder === "asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [books, debouncedKeyword, categoryId, priceRange, sortOrder]);

  const hasFilter = keyword.trim() !== "" || categoryId !== null || priceRange !== null;
  const clearFilters = () => {
    setKeyword("");
    setCategoryId(null);
    setPriceRange(null);
  };

  return (
    <View style={styles.container}>
      <Header title="📚 BookStore" onSearchPress={() => setSearchOpen((v) => !v)} />
      {searchOpen && <SearchBar value={keyword} onChangeText={setKeyword}
        onClose={() => { setSearchOpen(false); setKeyword(""); }} />}
      {loading ? <LoadingView label="Đang tải sách…" /> :
        error ? <ErrorView message={error} onRetry={load} /> :
        <BookGrid
          data={visibleBooks}
          onPressBook={(book) => navigation.navigate("BookDetail", { bookId: book.id })}
          ListEmptyComponent={<EmptyState emoji="🔎" title="Không tìm thấy sách phù hợp"
            message="Hãy thử từ khoá khác hoặc bỏ bớt bộ lọc."
            actionLabel="Xóa bộ lọc" onAction={clearFilters} />}
          ListHeaderComponent={
            <View>
              <CategoryChips categories={categories} selectedId={categoryId} onSelect={setCategoryId} />
              <PriceFilter value={priceRange} onChange={setPriceRange} />
              <View style={styles.toolbar}>
                {hasFilter ? <Pressable style={styles.clearButton} onPress={clearFilters}>
                  <Text style={styles.clearText}>✕ Xóa bộ lọc</Text>
                </Pressable> : <View />}
                <View style={styles.sortRow}>
                  <Text style={styles.sortLabel}>Sắp xếp:</Text>
                  <Pressable style={[styles.sortBtn, sortOrder === "asc" && styles.sortActive]}
                    onPress={() => setSortOrder(sortOrder === "asc" ? null : "asc")}>
                    <Text style={[styles.sortText, sortOrder === "asc" && styles.sortTextActive]}>Giá ↑</Text>
                  </Pressable>
                  <Pressable style={[styles.sortBtn, sortOrder === "desc" && styles.sortActive]}
                    onPress={() => setSortOrder(sortOrder === "desc" ? null : "desc")}>
                    <Text style={[styles.sortText, sortOrder === "desc" && styles.sortTextActive]}>Giá ↓</Text>
                  </Pressable>
                </View>
              </View>
            </View>}
        />}
      <FloatingCartButton count={totalQuantity} onPress={() => navigation.navigate("Cart")} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  toolbar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 12, paddingBottom: 10, gap: 8, flexWrap: "wrap" },
  clearButton: { backgroundColor: "#FDE8EA", paddingVertical: 7, paddingHorizontal: 10, borderRadius: radius.pill },
  clearText: { color: "#C3314A", fontSize: 12, fontWeight: "800" },
  sortRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  sortLabel: { fontSize: 12, color: colors.muted },
  sortBtn: { backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line, paddingVertical: 6, paddingHorizontal: 9, borderRadius: radius.pill },
  sortActive: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  sortText: { fontWeight: "700", fontSize: 12, color: colors.navy },
  sortTextActive: { color: "#fff" },
});
