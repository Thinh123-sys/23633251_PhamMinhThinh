import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

interface Props {
  value: number;
  size?: number;
  onChange?: (v: number) => void;
}

export function RatingStars({ value, size = 18, onChange }: Props) {
  return (
    <View style={styles.row} accessibilityLabel={`${value.toFixed(1)} trên 5 sao`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const star = <Text style={{ fontSize: size, color: n <= Math.round(value) ? colors.warning : colors.line }}>★</Text>;
        return onChange ? (
          <Pressable key={n} onPress={() => onChange(n)} accessibilityRole="button" accessibilityLabel={`${n} sao`} hitSlop={4}>
            {star}
          </Pressable>
        ) : <View key={n}>{star}</View>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({ row: { flexDirection: "row", alignItems: "center", gap: 2 } });
