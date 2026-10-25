// Bài 3 · 3.1 — Bottom Tab với 3 tab Home / Search / Profile (khung có sẵn trong đề, các TODO bên dưới)
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { usePhones, PhonesProvider } from '../api/PhonesContext';
import { ProductRow } from '../components/ProductRow';
import { colors } from '../theme';

type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

type IconName = keyof typeof Ionicons.glyphMap;

// tên icon: [khi chọn, khi không chọn]
const ICONS: Record<keyof TabParamList, [IconName, IconName]> = {
  Home: ['home', 'home-outline'],
  Search: ['search', 'search-outline'],
  Profile: ['person', 'person-outline'],
};

// Bài 3 · 3.1 (khung có sẵn): tab Home hiển thị danh sách FlatList, mỗi dòng là thẻ sản phẩm (ảnh, sao, giá)
function HomeTab() {
  const phones = usePhones();
  return (
    <FlatList
      data={phones}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => <ProductRow phone={item} />}
    />
  );
}

// Bài 3 · 3.1 TODO 1: tab Search — TextInput lọc sản phẩm theo từ khóa (không phân biệt hoa/thường)
function SearchTab() {
  const phones = usePhones();
  const [keyword, setKeyword] = useState('');
  const results = phones.filter((p) => p.name.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <View style={s.screen}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder='Nhập từ khóa'
        style={s.input}
      />
      {results.length === 0 ? (
        <Text style={s.empty}>Không có kết quả cho “{keyword}”</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => <ProductRow phone={item} />}
        />
      )}
    </View>
  );
}

// Bài 3 · 3.1 TODO 2: tab Profile — avatar tròn có chữ cái đầu, tên và email, canh giữa
function ProfileTab() {
  return (
    <View style={[s.screen, s.center]}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>N</Text>
      </View>
      <Text style={s.name}>Phạm Minh Thịnh</Text>
      <Text style={s.email}>thinh.pham@example.com</Text>
    </View>
  );
}

// Bài 3 · 3.1 TODO 3: NavigationContainer > Tab.Navigator, icon đổi đặc/viền theo focused, màu đỏ khi chọn
export function BottomTabApp() {
  return (
    <PhonesProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: colors.red,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />
            ),
          })}
        >
          <Tab.Screen name='Home' component={HomeTab} options={{ title: 'Trang chủ' }} />
          <Tab.Screen name='Search' component={SearchTab} options={{ title: 'Tìm kiếm' }} />
          <Tab.Screen name='Profile' component={ProfileTab} options={{ title: 'Cá nhân' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </PhonesProvider>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { alignItems: 'center', justifyContent: 'center' },
  card: { padding: 14, borderRadius: 8, backgroundColor: colors.bg },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 15,
  },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 24 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { color: '#fff', fontSize: 36, fontWeight: '700' },
  name: { fontSize: 20, fontWeight: '700', color: colors.text },
  email: { marginTop: 4, fontSize: 14, color: colors.muted },
});
