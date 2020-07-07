import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '../screens/LoginScreen'
import ListScreen from '../screens/ListScreen'
import ModalScreen from '../screens/ModalScreen'
import PasswordScreen from "../screens/PasswordSetScreen";
import { useSelector } from "react-redux";

const Stack = createStackNavigator()

function MainStackNavigator() {
  const stateData = useSelector((state) => state);

  let initialRouteRedirect = 'Login';

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteRedirect}
        mode='modal'
        headerMode='none'
        screenOptions={{
          cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1]
              })
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: 'clamp'
              })
            }
          })
        }}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='List' component={ListScreen} />
        <Stack.Screen name='Modal' component={ModalScreen} />
        <Stack.Screen name='Password' component={PasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator
