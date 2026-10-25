// Bài 1 · 1.1 — Stack Navigator cho hai màn Product và ChooseColor, ẩn header (code có sẵn trong đề)
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorKey, Phone } from '../types';
import { ChooseColorScreen } from './ChooseColorScreen';
import { ProductScreen } from './ProductScreen';

export type SelectPhoneParamList = {
  Product: { color?: ColorKey } | undefined;
  ChooseColor: { color?: ColorKey } | undefined;
};

const Stack = createNativeStackNavigator<SelectPhoneParamList>();

export function SelectPhoneApp({ phone }: { phone: Phone }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Product'>
          {(props) => <ProductScreen {...props} phone={phone} />}
        </Stack.Screen>
        <Stack.Screen name='ChooseColor'>
          {(props) => <ChooseColorScreen {...props} phone={phone} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
