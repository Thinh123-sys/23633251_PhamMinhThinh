// Bài 5 · 5.1 — Drawer gồm Home / Profile / Settings (khung có sẵn trong đề, các TODO bên dưới)
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { colors } from '../theme';
import { SettingsProvider, useSettings } from './SettingsContext';

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

type IconName = keyof typeof Ionicons.glyphMap;

// Bài 5 · 5.1 TODO 2: icon của từng mục trong menu drawer
const DRAWER_ICONS: Record<keyof DrawerParamList, IconName> = {
  Home: 'home-outline',
  Profile: 'person-outline',
  Settings: 'settings-outline',
};

// Bài 5 · 5.1 TODO 3 (nâng cao): màu nền và màu chữ đổi theo Switch "Giao diện tối"
function useScreenColors() {
  const { dark } = useSettings();
  return dark
    ? { bg: '#111827', text: '#F9FAFB', muted: '#9CA3AF', line: '#374151' }
    : { bg: '#FFFFFF', text: colors.text, muted: colors.muted, line: colors.line };
}

// Khung có sẵn trong đề — chỉ thêm màu nền/chữ theo chế độ (TODO 3)
function HomeScreen() {
  const c = useScreenColors();
  return (
    <View style={[s.center, { backgroundColor: c.bg }]}>
      <Text style={[s.big, { color: c.text }]}>Xin chào 👋</Text>
    </View>
  );
}

// Khung có sẵn trong đề — chỉ thêm màu nền/chữ theo chế độ (TODO 3)
function ProfileScreen() {
  const c = useScreenColors();
  return (
    <View style={[s.center, { backgroundColor: c.bg }]}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>NA</Text>
      </View>
      <Text style={[s.big, { color: c.text }]}>Phạm Minh Thịnh</Text>
      <Text style={[s.muted, { color: c.muted }]}>thinh.pham@example.com</Text>
    </View>
  );
}

// Bài 5 · 5.1 TODO 1: màn Settings có 2 Switch (Nhận thông báo, Giao diện tối) và dòng trạng thái
function SettingsScreen() {
  const { notify, setNotify, dark, setDark } = useSettings();
  const c = useScreenColors();

  return (
    <View style={[s.screen, { backgroundColor: c.bg }]}>
      <View style={[s.row, { borderBottomColor: c.line }]}>
        <Text style={[s.rowLabel, { color: c.text }]}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>
      <View style={[s.row, { borderBottomColor: c.line }]}>
        <Text style={[s.rowLabel, { color: c.text }]}>Giao diện tối</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Text style={[s.status, { color: c.muted }]}>
        {`Thông báo: ${notify ? 'BẬT' : 'TẮT'} · Giao diện: ${dark ? 'tối' : 'sáng'}`}
      </Text>
    </View>
  );
}

// Bài 5 · 5.1 TODO 2: NavigationContainer > Drawer.Navigator, icon theo tên route, màu đỏ khi chọn
export function DrawerApp() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={({ route }) => ({
            drawerActiveTintColor: colors.red,
            drawerIcon: ({ color, size }) => (
              <Ionicons name={DRAWER_ICONS[route.name]} size={size} color={color} />
            ),
          })}
        >
          <Drawer.Screen name='Home' component={HomeScreen} options={{ title: 'Trang chủ' }} />
          <Drawer.Screen name='Profile' component={ProfileScreen} options={{ title: 'Cá nhân' }} />
          <Drawer.Screen name='Settings' component={SettingsScreen} options={{ title: 'Cài đặt' }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  screen: { flex: 1, padding: 20 },
  big: { fontSize: 22, fontWeight: '700' },
  muted: { fontSize: 14, marginTop: 4 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { color: '#fff', fontSize: 30, fontWeight: '700' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowLabel: { fontSize: 16 },
  status: { marginTop: 20, fontSize: 14 },
});
