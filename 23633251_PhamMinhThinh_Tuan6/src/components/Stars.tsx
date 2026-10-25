// Dùng chung — Đề Lab06 · Mục 2 (code có sẵn trong đề): hiển thị số sao đánh giá
import React from 'react';
import { Text } from 'react-native';
import { colors } from '../theme';

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <Text style={{ color: colors.star, fontSize: size, letterSpacing: 1 }}>
      {'★'.repeat(value)}
      <Text style={{ color: colors.line }}>{'★'.repeat(5 - value)}</Text>
    </Text>
  );
}
