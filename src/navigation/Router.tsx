import {
  createNavigationContainerRef,
  NavigationContainer,
  DefaultTheme,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MainNavigator, MainStackParamList} from './Main';
import {screenOptions} from './options';

export type RootRouterParamList = {
  MainStack: NavigatorScreenParams<MainStackParamList>;
};

export const navigationRef =
  createNavigationContainerRef<RootRouterParamList>();

type NavigationParams = Parameters<typeof navigationRef.navigate>;

export function navigate(...params: NavigationParams) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...params);
  }
}

const RootRouterStack = createNativeStackNavigator<
  RootRouterParamList & MainStackParamList
>();

export function RootRouter() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootRouterStack.Navigator screenOptions={screenOptions}>
        <RootRouterStack.Screen
          name="MainStack"
          component={MainNavigator}
          options={screenOptions}
        />
      </RootRouterStack.Navigator>
    </NavigationContainer>
  );
}
