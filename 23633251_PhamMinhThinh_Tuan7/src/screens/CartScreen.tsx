import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { CartItemRow } from "../components/CartItemRow";
import { EmptyState } from "../components/EmptyState";
import { useCart } from "../store/hooks";
import { TabScreenProps } from "../navigation/types";
import { colors, formatPrice, radius } from "../theme";

export function CartScreen({ navigation }: TabScreenProps<"Cart">) {
  const { items, totalPrice } = useCart();
  return (
    <View style={styles.container}>
      <Header title="🛒 Giỏ hàng" />
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.bookId)}
        renderItem={({ item }) => <CartItemRow item={item} />}
        contentContainerStyle={{ paddingVertical: 8, flexGrow: 1 }}
        ListEmptyComponent={<EmptyState emoji="🛒" title="Giỏ hàng trống" message="Hãy chọn sách ở trang Home để thêm vào giỏ." />}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Tổng cộng: {formatPrice(totalPrice)}</Text>
        <Pressable style={[styles.btn, items.length === 0 && styles.btnDisabled]}
          disabled={items.length === 0}
          onPress={() => navigation.navigate("Checkout", { total: totalPrice })}>
          <Text style={styles.btnText}>Thanh toán</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  footer: { backgroundColor: "#fff", padding: 14, gap: 10, borderTopWidth: 1, borderTopColor: colors.line },
  total: { fontSize: 17, fontWeight: "800", color: colors.navy },
  btn: { backgroundColor: colors.indigo, padding: 14, borderRadius: radius.md, alignItems: "center" },
  btnDisabled: { opacity: 0.4 },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
