// Tổng hợp Giờ 1 + 2 + 3 — Trang chủ BookStore
// Thứ tự: Header (cố định) → Category Chips → Lưới sách (có Badge) → Floating Cart
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { BookGrid } from './components/BookGrid';
import { FloatingCartButton } from './components/FloatingCartButton';
import { BOOKS } from './data';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <View style={styles.screen}>
      {/* 1. Header cố định trên cùng — ngoài ScrollView nên không cuộn theo */}
      <Header />

      {/* 2. ScrollView chứa Chips + Grid — paddingBottom đủ lớn để
          FloatingCartButton không che mất sách cuối cùng */}
      <ScrollView contentContainerStyle={styles.content}>
        <CategoryChips />
        <View style={styles.gridSpacer}>
          <BookGrid
            books={BOOKS}
            onPressBook={() => setCartCount((n) => n + 1)}
          />
        </View>
      </ScrollView>

      {/* 3. Nút giỏ nổi — NGOÀI ScrollView, neo góc dưới-phải màn hình */}
      <FloatingCartButton
        count={cartCount}
        onPress={() => setCartCount((n) => n + 1)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 100 },
  gridSpacer: { marginTop: 16 },
});
