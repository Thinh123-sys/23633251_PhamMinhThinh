// Bài 1 · 1.3 — màn ChooseColor (Screen 02 chưa chọn màu, Screen 03 đã chọn đỏ)
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLOR_ORDER, PHONE_COLORS } from '../data/phones';
import { colors, formatPrice } from '../theme';
import { ColorKey, Phone } from '../types';
import type { SelectPhoneParamList } from './SelectPhoneApp';

type Props = NativeStackScreenProps<SelectPhoneParamList, 'ChooseColor'> & { phone: Phone };

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  // Bài 1 · 1.3 (code có sẵn): màu đang chọn trên màn này, khởi tạo từ params
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(' - '); // "Điện Thoại Vsmart Joy 3" / "Hàng chính hãng"

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image source={PHONE_COLORS[picked ?? phone.defaultColor].image} style={styles.thumb} resizeMode='contain' />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>

          {/* Bài 1 · 1.3 TODO 3: chỉ khi đã chọn màu mới hiện "Màu", nhà cung cấp và giá (chữ đậm) */}
          {picked && (
            <>
              <Text style={styles.small}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.small}>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.bold}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </View>

        {/* Bài 1 · 1.3 TODO 4: nút XONG xanh → gửi màu đã chọn về màn Product (merge params) */}
        <Pressable
          style={styles.doneBtn}
          onPress={() => navigation.navigate({ name: 'Product', params: { color: picked }, merge: true })}
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  thumb: { width: 80, height: 130 },
  headerText: { flex: 1, gap: 4 },
  small: { fontSize: 14, color: colors.text },
  bold: { fontWeight: '700', color: colors.text },
  body: { flex: 1, backgroundColor: colors.grey, padding: 16 },
  hint: { fontSize: 15, color: colors.text, marginBottom: 12 },
  swatches: { gap: 12, alignItems: 'center' },
  swatch: { width: 140, height: 40, borderRadius: 4, borderWidth: 1, borderColor: colors.line },
  swatchOn: { borderWidth: 3, borderColor: colors.text },
  doneBtn: {
    marginTop: 'auto',
    backgroundColor: colors.blue,
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: 'center',
  },
  doneText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
