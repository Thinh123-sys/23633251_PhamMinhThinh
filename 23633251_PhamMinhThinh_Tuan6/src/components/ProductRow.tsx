// Bài 4 · 4.2 — một dòng sản phẩm dùng chung cho tab Products và Favorites (TODO 3, TODO 8)
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { PHONE_COLORS } from '../data/phones';
import { colors, formatPrice } from '../theme';
import { Phone } from '../types';
import { Stars } from './Stars';

export function ProductRow({ phone, onPress }: { phone: Phone; onPress?: () => void }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={styles.thumb} resizeMode='contain' />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{phone.name.split(' - ')[0]}</Text>
        <Stars value={phone.rating} size={13} />
        <Text style={styles.price}>{formatPrice(phone.price)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.line,
  },
  thumb: { width: 64, height: 96 },
  info: { flex: 1, gap: 4 },
  name: { fontSize: 15, fontWeight: '600', color: colors.text },
  price: { fontSize: 15, fontWeight: '700', color: colors.red },
});
