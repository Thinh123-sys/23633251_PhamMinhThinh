// Bài 4 · 4.2 — Stack chính (Home là Tab, ProductDetails) + FavoritesProvider bao ngoài
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { PhonesProvider } from '../api/PhonesContext';
import { FavoritesProvider } from './FavoritesContext';
import { FavoritesTab } from './FavoritesTab';
import { ProductDetailsScreen } from './ProductDetailsScreen';
import { ProductsTab } from './ProductsTab';
import { RootStackParamList, TabParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

type IconName = keyof typeof Ionicons.glyphMap;

// tên icon: [khi chọn, khi không chọn]
const TAB_ICONS: Record<keyof TabParamList, [IconName, IconName]> = {
  Products: ['grid', 'grid-outline'],
  Favorites: ['heart', 'heart-outline'],
};

// Bài 4 · 4.2 TODO 1: Home là một Tab Navigator gồm 2 tab Products và Favorites, mỗi tab có icon Ionicons
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={TAB_ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name='Products' component={ProductsTab} options={{ title: 'Sản phẩm' }} />
      <Tab.Screen name='Favorites' component={FavoritesTab} options={{ title: 'Yêu thích' }} />
    </Tab.Navigator>
  );
}

// Bài 4 · 4.2 TODO 2: FavoritesProvider > NavigationContainer > Stack.Navigator (Home + ProductDetails)
export function StackTabApp() {
  return (
    <PhonesProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeTabs} options={{ title: 'Cửa hàng' }} />
            <Stack.Screen
              name='ProductDetails'
              component={ProductDetailsScreen}
              options={{ title: 'Chi tiết sản phẩm' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </PhonesProvider>
  );
}
