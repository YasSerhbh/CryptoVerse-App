import { StyleSheet, Text, View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import Welcome from './screens/Welcome';
import Main from './screens/Main';
import Details from './screens/main-screens/Details'
import merge from 'deepmerge';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { adaptNavigationTheme, PaperProvider } from 'react-native-paper';
import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
    MD3DarkTheme,
    MD3LightTheme,
} from 'react-native-paper';


const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});
const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);
const Stack = createStackNavigator()


export default function Application() {
    var theme = useTheme()
    const {active} = useSelector(state => state.darkMode)


  return (
    <PaperProvider theme={active ? CombinedDarkTheme : CombinedDefaultTheme}>
    <NavigationContainer theme={active ? CombinedDarkTheme : CombinedDefaultTheme}>
        <Stack.Navigator initialRouteName='Welcome' >
            <Stack.Screen name='Welcome' component={Welcome} options={{headerShown: false}} />
            <Stack.Screen name='Main' component={Main} initialParams={{}} options={{
                headerShown: true,
                headerLeft: () => (
                    <Image source={require('./assets/images/32.png')} style={{marginHorizontal: 19}} />
                ),
                title: 'CryptoVerse',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: theme.colors.primary
                }
                
                }} />
            <Stack.Screen name='Details' component={Details} options={{
                headerShown: true,
                headerLeft: () => (
                    <Image source={require('./assets/images/32.png')} style={{marginHorizontal: 19}} />
                ),
                title: 'CryptoVerse',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: theme.colors.primary
                }
                
                }} />
        </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

// 
// Primary #6651a4
// 2eme Color: #c3bbd5