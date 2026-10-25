// Bài 1 · 1.2 — màn Product (Screen 01 chưa chọn màu, Screen 04 đã chọn màu)
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stars } from '../components/Stars';
import { PHONE_COLORS } from '../data/phones';
import { colors, formatPrice } from '../theme';
import { Phone } from '../types';
import type { SelectPhoneParamList } from './SelectPhoneApp';

type Props = NativeStackScreenProps<SelectPhoneParamList, 'Product'> & { phone: Phone };

export function ProductScreen({ navigation, route, phone }: Props) {
  // Bài 1 · 1.2: màu đã chọn (từ ChooseColor gửi về) hoặc màu mặc định
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image source={PHONE_COLORS[shown].image} style={styles.image} resizeMode='contain' />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>
        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <Ionicons name='help-circle-outline' size={14} color={colors.muted} />
        </View>

        {/* Bài 1 · 1.2 TODO 1: nút "4 MÀU-CHỌN MÀU" (chưa chọn) / "4 MÀU-CHỌN LOẠI" (đã chọn), bấm → ChooseColor */}
        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate('ChooseColor', { color: picked })}
        >
          <Text style={styles.chooseText}>{picked ? '4 MÀU-CHỌN LOẠI' : '4 MÀU-CHỌN MÀU'}</Text>
          <Ionicons name='chevron-forward' size={18} color={colors.text} style={styles.chevron} />
        </Pressable>
      </View>

      {/* Bài 1 · 1.2 TODO 2: nút CHỌN MUA đỏ, sát đáy màn hình (nằm ngoài khối info) */}
      <Pressable style={styles.buyBtn}>
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  imageWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
  info: { gap: 6, paddingBottom: 12 },
  name: { fontSize: 16, fontWeight: '600', color: colors.text },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  review: { fontSize: 12, color: colors.blue },
  price: { fontSize: 18, fontWeight: '700', color: colors.red },
  oldPrice: { fontSize: 13, color: colors.muted, textDecorationLine: 'line-through' },
  badge: { fontSize: 11, fontWeight: '600', color: colors.red },
  chooseBtn: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chooseText: { fontWeight: '600', color: colors.text },
  chevron: { position: 'absolute', right: 12 },
  buyBtn: {
    marginBottom: 12,
    backgroundColor: colors.red,
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buyText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
