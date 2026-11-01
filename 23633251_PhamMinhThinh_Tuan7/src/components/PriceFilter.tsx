import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PRICE_RANGES, type PriceRange } from "../utils/filters";
import { colors, radius } from "../theme";

interface Props { value: PriceRange; onChange: (value: PriceRange) => void; }
// Bấm vào lựa chọn đang bật lần nữa để bỏ lọc.
export function PriceFilter({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {PRICE_RANGES.map((range) => {
        const active = value === range.key;
        return (
          <Pressable key={range.key} style={[styles.btn, active && styles.btnActive]}
            onPress={() => onChange(active ? null : range.key)}>
            <Text style={[styles.text, active && styles.textActive]}>{range.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 12, paddingBottom: 10, gap: 8 },
  btn: { borderRadius: radius.pill, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.cyan, paddingHorizontal: 12, paddingVertical: 7 },
  btnActive: { backgroundColor: colors.cyan },
  text: { fontSize: 12, fontWeight: "700", color: colors.navy },
  textActive: { color: "#fff" },
});
