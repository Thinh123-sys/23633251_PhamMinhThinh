// Bài 4 · 4.2 — màn chi tiết, nhận id qua route.params và nút lưu yêu thích
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stars } from '../components/Stars';
import { usePhones } from '../api/PhonesContext';
import { PHONE_COLORS } from '../data/phones';
import { colors, formatPrice } from '../theme';
import { useFavorites } from './FavoritesContext';
import { RootProps } from './types';

export function ProductDetailsScreen({ route }: RootProps<'ProductDetails'>) {
  // Bài 4 · 4.2 TODO 4: lấy id từ params rồi tìm sản phẩm trong danh sách lấy từ API
  const { id } = route.params;
  const phones = usePhones();
  const phone = phones.find((p) => p.id === id);
  // hook phải gọi trước mọi return sớm
  const { has, toggle } = useFavorites();

  // Bài 4 · 4.2 TODO 5: không tìm thấy → thông báo "Không tìm thấy sản phẩm #id"
  if (!phone) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>{`Không tìm thấy sản phẩm #${id}`}</Text>
      </View>
    );
  }

  const saved = has(phone.id);

  return (
    <SafeAreaView style={styles.root}>
      {/* Bài 4 · 4.2 TODO 6: ảnh (màu mặc định), tên, sao, giá, nhà cung cấp */}
      <View style={styles.imageWrap}>
        <Image source={PHONE_COLORS[phone.defaultColor].image} style={styles.image} resizeMode='contain' />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>
        <Stars value={phone.rating} />
        <Text style={styles.price}>{formatPrice(phone.price)}</Text>
        <Text style={styles.supplier}>Cung cấp bởi {phone.supplier}</Text>
      </View>

      {/* Bài 4 · 4.2 TODO 7: "♡ Lưu vào yêu thích" / "♥ Đã lưu" → toggle(phone.id) */}
      <Pressable style={[styles.btn, saved && styles.btnSaved]} onPress={() => toggle(phone.id)}>
        <Text style={styles.btnText}>{saved ? '♥ Đã lưu' : '♡ Lưu vào yêu thích'}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  notFound: { fontSize: 16, color: colors.muted },
  imageWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
  info: { gap: 6, paddingBottom: 12 },
  name: { fontSize: 17, fontWeight: '600', color: colors.text },
  price: { fontSize: 18, fontWeight: '700', color: colors.red },
  supplier: { fontSize: 13, color: colors.muted },
  btn: {
    marginBottom: 12,
    backgroundColor: colors.navy,
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnSaved: { backgroundColor: colors.red },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
