import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { SelectPhoneApp } from './src/ex1/SelectPhoneApp';
import { SelectPhoneApi } from './src/ex1/SelectPhoneApi';
import { BottomTabApp } from './src/ex3/BottomTabApp';
import { StackTabApp } from './src/ex4/StackTabApp';
import { DrawerApp } from './src/ex5/DrawerApp';
import { PHONES } from './src/data/phones';
import { colors } from './src/theme';

type Exercise = '1' | '2' | '3' | '4' | '5';

const EXERCISES: { id: Exercise; title: string; description: string }[] = [
  { id: '1', title: 'Bài 1 — Select Phone', description: 'Stack Navigation · Chọn màu điện thoại' },
  { id: '2', title: 'Bài 2 — Select Phone + API', description: 'Loading · Lỗi · Thử lại · Dữ liệu API/offline' },
  { id: '3', title: 'Bài 3 — Bottom Tabs', description: 'Trang chủ · Tìm kiếm · Cá nhân' },
  { id: '4', title: 'Bài 4 — Stack + Tabs', description: 'Danh sách · Chi tiết · Yêu thích · Truyền params' },
  { id: '5', title: 'Bài 5 — Drawer', description: 'Trang chủ · Cá nhân · Cài đặt · Chế độ tối' },
];

export default function App() {
  const [exercise, setExercise] = useState<Exercise | null>(null);

  const selectedApp = () => {
    switch (exercise) {
      case '1':
        return <SelectPhoneApp phone={PHONES[0]} />;
      case '2':
        return <SelectPhoneApi />;
      case '3':
        return <BottomTabApp />;
      case '4':
        return <StackTabApp />;
      case '5':
        return <DrawerApp />;
      default:
        return null;
    }
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        {exercise === null ? (
          <ScrollView contentContainerStyle={styles.menu}>
            <Text style={styles.eyebrow}>THỰC HÀNH REACT NATIVE · LAB 06</Text>
            <Text style={styles.heading}>Navigation</Text>
            <Text style={styles.subheading}>
              Chọn bài thực hành để mở ứng dụng tương ứng.
            </Text>

            {EXERCISES.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setExercise(item.id)}
                style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              >
                <View style={styles.number}>
                  <Text style={styles.numberText}>{item.id}</Text>
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </Pressable>
            ))}
            <Text style={styles.footer}>Lab06 · Expo + React Native + TypeScript</Text>
          </ScrollView>
        ) : (
          <View style={styles.appScreen}>
            <Pressable style={styles.backButton} onPress={() => setExercise(null)}>
              <Text style={styles.backText}>‹  Danh sách bài</Text>
            </Pressable>
            <View style={styles.exercise}>{selectedApp()}</View>
          </View>
        )}
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F5F7' },
  menu: { flexGrow: 1, padding: 22, paddingTop: 44 },
  eyebrow: { color: colors.red, fontSize: 12, fontWeight: '800', letterSpacing: 1.1 },
  heading: { marginTop: 8, color: colors.text, fontSize: 32, fontWeight: '800' },
  subheading: { marginTop: 8, marginBottom: 22, color: colors.muted, fontSize: 15, lineHeight: 22 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardPressed: { opacity: 0.75 },
  number: {
    width: 42, height: 42, borderRadius: 12, backgroundColor: '#FDE8E7',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  numberText: { color: colors.red, fontSize: 18, fontWeight: '800' },
  cardText: { flex: 1 },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  cardDescription: { marginTop: 4, color: colors.muted, fontSize: 12, lineHeight: 17 },
  arrow: { marginLeft: 8, color: colors.muted, fontSize: 30 },
  footer: { marginTop: 10, textAlign: 'center', color: colors.muted, fontSize: 12 },
  appScreen: { flex: 1, backgroundColor: '#FFFFFF' },
  backButton: {
    zIndex: 10, paddingHorizontal: 16, paddingVertical: 10,
    backgroundColor: '#F4F5F7', borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  backText: { color: colors.red, fontSize: 14, fontWeight: '700' },
  exercise: { flex: 1 },
});
