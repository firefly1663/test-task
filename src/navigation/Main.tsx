import CartScreen from '@src/screens/CartScreen';
import MarketScreen from '@src/screens/MarketScreen';
import {screenOptions} from '@navigation/options';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';

export type MainStackParamList = {
  MarketScreen: undefined;
  CartScreen: undefined;
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

export type MarketScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'MarketScreen'
>;
export type CartScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'CartScreen'
>;

export function MainNavigator() {
  return (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen name="MarketScreen" component={MarketScreen} />
      <MainStack.Screen name="CartScreen" component={CartScreen} />
    </MainStack.Navigator>
  );
}
