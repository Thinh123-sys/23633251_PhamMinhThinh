import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBookById } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useCart, useWishlist } from "../store/hooks";
import { RootScreenProps } from "../navigation/types";
import { Book } from "../types";
import { colors, formatPrice, radius } from "../theme";

export function BookDetailScreen({ route }: RootScreenProps<"BookDetail">) {
  const { bookId } = route.params;
  const { add } = useCart();
  const { isFavorite, toggle } = useWishlist();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBookById(bookId);
      setBook(data);
    } catch (e) {
      setBook(null);
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => { void load(); }, [load]);
  if (loading) return <LoadingView label="Đang tải chi tiết sách…" />;
  if (error || !book) return <ErrorView message={error ?? "Không tìm thấy sách."} onRetry={load} />;

  const favorite = isFavorite(book.id);
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        <Text style={styles.emoji}>{book.emoji}</Text>
      </View>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{book.title}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel={favorite ? "Bỏ yêu thích" : "Thêm yêu thích"}
          onPress={() => toggle(book.id)} style={styles.favoriteButton}>
          <Text style={styles.favorite}>{favorite ? "♥" : "♡"}</Text>
        </Pressable>
      </View>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.price}>{formatPrice(book.price)}</Text>
      <Text style={styles.stock}>Còn {book.stock} cuốn</Text>
      <Text style={styles.desc}>{book.description}</Text>
      <Pressable style={[styles.btn, book.stock <= 0 && styles.disabled]} disabled={book.stock <= 0}
        onPress={() => add({ bookId: book.id, title: book.title, price: book.price,
          emoji: book.emoji, color: book.color, stock: book.stock })}>
        <Text style={styles.btnText}>{book.stock <= 0 ? "Đã hết hàng" : "Thêm vào giỏ"}</Text>
      </Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 8 },
  cover: { height: 220, borderRadius: radius.lg, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 90 },
  titleRow: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 8 },
  title: { flex: 1, fontSize: 22, fontWeight: "800", color: colors.text },
  favoriteButton: { paddingHorizontal: 12, paddingVertical: 6 },
  favorite: { fontSize: 30, color: "#E04667" },
  author: { color: colors.muted, fontSize: 15 },
  price: { fontSize: 20, fontWeight: "800", color: colors.indigo },
  stock: { color: colors.muted },
  desc: { color: colors.text, lineHeight: 22, marginTop: 4 },
  btn: { backgroundColor: colors.indigo, padding: 14, borderRadius: radius.md, alignItems: "center", marginTop: 12 },
  disabled: { opacity: 0.4 },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
