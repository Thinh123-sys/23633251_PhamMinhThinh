// Bài 2 · 2.1 — màn hình chờ khi đang gọi API (TODO 5: vòng xoay ActivityIndicator + chữ "Đang tải...")
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function Loading() {
  return (
    <View style={styles.center}>
      <ActivityIndicator size='large' color={colors.red} />
      <Text style={styles.text}>Đang tải...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  text: { marginTop: 12, fontSize: 15, color: colors.muted },
});
