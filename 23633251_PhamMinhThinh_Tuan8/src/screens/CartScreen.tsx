import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Header } from "../components/Header";
import { CartItemRow } from "../components/CartItemRow";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";
import { useAuth, useCart } from "../store/hooks";
import { confirmDialog } from "../utils/dialog";
import { TabScreenProps } from "../navigation/types";
import { colors, formatPrice, radius } from "../theme";

type Coupon = "SALE10" | "GIAM50K";

export function CartScreen({ navigation }: TabScreenProps<"Cart">) {
  const { items, totalPrice, setQty, remove } = useCart();
  const { isLoggedIn } = useAuth();
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const discount = useMemo(() => {
    if (coupon === "SALE10") return Math.round(totalPrice * 0.1);
    if (coupon === "GIAM50K") return Math.min(50000, totalPrice);
    return 0;
  }, [coupon, totalPrice]);
  const finalTotal = Math.max(0, totalPrice - discount);

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (code === "SALE10" || code === "GIAM50K") {
      setCoupon(code);
      setCouponError(null);
    } else {
      setCoupon(null);
      setCouponError(code ? "Mã giảm giá không hợp lệ" : "Vui lòng nhập mã giảm giá");
    }
  };

  const askRemove = (bookId: number) => {
    const book = items.find((item) => item.bookId === bookId);
    confirmDialog("Xóa sản phẩm", `Xóa ${book?.title ?? "sản phẩm này"} khỏi giỏ hàng?`, () => remove(bookId));
  };

  const goCheckout = () => {
    if (isLoggedIn) navigation.navigate("Checkout", { total: finalTotal });
    else navigation.navigate("Login", { redirectTo: "Checkout", total: finalTotal });
  };

  return (
    <View style={styles.container}>
      <Header title="🛒 Giỏ hàng" />
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.bookId)}
        renderItem={({ item }) => <CartItemRow item={item} onChangeQty={setQty} onRemove={askRemove} />}
        contentContainerStyle={{ paddingVertical: 8, flexGrow: 1 }}
        ListEmptyComponent={
          <EmptyState emoji="🛒" title="Giỏ hàng trống" message="Hãy chọn vài cuốn sách yêu thích nhé."
            actionLabel="Khám phá sách" onAction={() => navigation.navigate("Home")} />
        }
      />
      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.couponRow}>
            <TextInput
              style={styles.couponInput}
              placeholder="Mã giảm giá (SALE10)"
              placeholderTextColor={colors.muted}
              value={couponInput}
              autoCapitalize="characters"
              onChangeText={(v) => { setCouponInput(v); setCouponError(null); }}
              accessibilityLabel="Mã giảm giá"
            />
            <View style={styles.applyButton}><PrimaryButton title="Áp dụng" onPress={applyCoupon} /></View>
          </View>
          {couponError ? <Text style={styles.error}>{couponError}</Text> : null}
          {coupon && <Text style={styles.success}>Đã áp dụng mã {coupon}</Text>}
          <View style={styles.line}><Text style={styles.muted}>Tạm tính</Text><Text style={styles.value}>{formatPrice(totalPrice)}</Text></View>
          {discount > 0 && <View style={styles.line}><Text style={styles.discount}>Giảm giá</Text><Text style={styles.discount}>−{formatPrice(discount)}</Text></View>}
          <View style={styles.line}><Text style={styles.total}>Tổng cộng</Text><Text style={styles.total}>{formatPrice(finalTotal)}</Text></View>
          <PrimaryButton title="Thanh toán" onPress={goCheckout} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  footer: { backgroundColor: "#fff", padding: 14, gap: 8, borderTopWidth: 1, borderTopColor: colors.line },
  line: { flexDirection: "row", justifyContent: "space-between" },
  couponRow: { flexDirection: "row", gap: 8, alignItems: "stretch" },
  couponInput: { flex: 1, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.card, borderRadius: radius.md, paddingHorizontal: 12, color: colors.text, minWidth: 0 },
  applyButton: { minWidth: 100 },
  muted: { color: colors.muted },
  value: { fontWeight: "700", color: colors.text },
  total: { fontSize: 17, fontWeight: "800", color: colors.navy },
  discount: { color: colors.success, fontWeight: "700" },
  error: { color: colors.danger, fontSize: 12 },
  success: { color: colors.success, fontSize: 12 },
});
