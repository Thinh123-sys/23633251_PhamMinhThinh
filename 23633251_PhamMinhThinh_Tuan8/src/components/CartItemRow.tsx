import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDebounce } from "../hooks/useDebounce";
import { CartItem } from "../types";
import { colors, formatPrice, radius } from "../theme";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);
  const pendingUserEdit = useRef(false);

  // Khi store cập nhật từ màn khác, đảm bảo số đang hiển thị luôn được đồng bộ.
  useEffect(() => {
    setQty(item.quantity);
    pendingUserEdit.current = false;
  }, [item.quantity]);

  // Chỉ ghi vào Redux khi người dùng thật sự bấm +/- và đã dừng 300ms.
  useEffect(() => {
    if (!pendingUserEdit.current || debouncedQty === item.quantity) return;
    pendingUserEdit.current = false;
    onChangeQty(item.bookId, debouncedQty);
  }, [debouncedQty, item.bookId, item.quantity, onChangeQty]);

  const changeQty = (delta: number) => {
    pendingUserEdit.current = true;
    setQty((current) => Math.max(1, Math.min(item.stock, current + delta)));
  };
  const canDec = qty > 1;
  const canInc = qty < item.stock;

  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.quantityRow}>
          <Pressable style={[styles.adjust, !canDec && styles.disabled]} disabled={!canDec} accessibilityRole="button" accessibilityLabel="Giảm" onPress={() => changeQty(-1)}>
            <Text style={styles.adjustText}>−</Text>
          </Pressable>
          <Text style={styles.qty}>{qty}</Text>
          <Pressable style={[styles.adjust, !canInc && styles.disabled]} disabled={!canInc} accessibilityRole="button" accessibilityLabel="Tăng" onPress={() => changeQty(1)}>
            <Text style={styles.adjustText}>+</Text>
          </Pressable>
          <Text style={styles.stock}>Còn {item.stock}</Text>
        </View>
      </View>
      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={8} accessibilityRole="button" accessibilityLabel="Xóa khỏi giỏ">
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 4 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  quantityRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 3, flexWrap: "wrap" },
  adjust: { width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg },
  disabled: { opacity: 0.35 },
  adjustText: { color: colors.navy, fontWeight: "800", fontSize: 16 },
  qty: { minWidth: 12, textAlign: "center", fontWeight: "800", color: colors.navy },
  stock: { fontSize: 11, color: colors.muted },
  trash: { fontSize: 22 },
});
