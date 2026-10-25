// Bài 4 · 4.2 — tab Favorites: lọc PHONES theo danh sách id đã lưu trong Context
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ProductRow } from '../components/ProductRow';
import { usePhones } from '../api/PhonesContext';
import { colors } from '../theme';
import { useFavorites } from './FavoritesContext';
import { TabProps } from './types';

export function FavoritesTab({ navigation }: TabProps<'Favorites'>) {
  // Bài 4 · 4.2 TODO 8: lấy ids từ Context rồi lọc PHONES
  const { ids } = useFavorites();
  const phones = usePhones();
  const favorites = phones.filter((p) => ids.includes(p.id));

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Chưa có sản phẩm nào được lưu.</Text>
      </View>
    );
  }

  // Bấm một dòng cũng mở ProductDetails như tab Products
  return (
    <FlatList
      data={favorites}
      keyExtractor={(p) => p.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <ProductRow
          phone={item}
          onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  empty: { fontSize: 15, color: colors.muted },
  list: { padding: 16, gap: 10 },
});
