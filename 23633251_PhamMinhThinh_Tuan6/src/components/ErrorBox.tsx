// Bài 2 · 2.1 — hiển thị lỗi và nút THỬ LẠI (TODO 4)
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Không tải được dữ liệu</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: '700', color: colors.text },
  message: { marginTop: 8, marginBottom: 20, fontSize: 14, color: colors.muted, textAlign: 'center' },
  button: { backgroundColor: colors.red, borderRadius: 6, paddingVertical: 12, paddingHorizontal: 32 },
  buttonText: { color: '#fff', fontWeight: '700' },
});
