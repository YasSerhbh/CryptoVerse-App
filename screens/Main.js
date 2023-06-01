import { View, Text, StatusBar, useWindowDimensions } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Home from './main-screens/Home'
import CryptoCurrencies from './main-screens/CryptoCurrencies'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import News from './main-screens/News'
import { useTheme } from 'react-native-paper'
import { border } from '../components/constants'

const Tab = createMaterialBottomTabNavigator()


const Main = () => {

    const {width} = useWindowDimensions()
    const theme = useTheme()
    
  return (
    <>
            <StatusBar
                animated={true}
                backgroundColor={theme.colors.primary}
                hidden={false}
                barStyle='light-content'
            />
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} options={{
                    tabBarLabel: false,
                tabBarIcon: ({focused}) => (
                    <View style={{width: width / 3, height: 76, top: -14, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? theme.colors.primaryContainer : theme.colors.inverseOnSurface, borderRadius: 26}}>
                        <MaterialCommunityIcons name="home" color={focused ? theme.colors.primary : theme.colors.onBackground} size={27} />
                        <Text style={{fontSize: 12, color: focused ? theme.colors.primary : theme.colors.onBackground}}>Home</Text>
                    </View>
                )
                }} />
            <Tab.Screen name='CryptoCurrencies' component={CryptoCurrencies} options={{
                tabBarLabel: false,
                tabBarIcon: ({focused}) => (
                    <View style={{width: width / 3, height: 76, top: -14, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? theme.colors.primaryContainer : theme.colors.inverseOnSurface, borderRadius: 26}}>
                        <MaterialCommunityIcons name="bitcoin" color={focused ? theme.colors.primary : theme.colors.onBackground} size={27} />
                        <Text style={{fontSize: 12, color: focused ? theme.colors.primary : theme.colors.onBackground}}>CryptoCurrencies</Text>
                    </View>
                )
                }} />
            <Tab.Screen name='News' component={News} options={{
                tabBarLabel: false,
                tabBarIcon: ({focused}) => (
                    <View style={{width: width / 3, height: 76, top: -14, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? theme.colors.primaryContainer : theme.colors.inverseOnSurface, borderRadius: 26}}>
                        <MaterialCommunityIcons name="newspaper-variant-multiple" color={focused ? theme.colors.primary : theme.colors.onBackground} size={27} />
                        <Text style={{fontSize: 12, color: focused ? theme.colors.primary : theme.colors.onBackground}}>News</Text>
                    </View>
                )
            }} />
        </Tab.Navigator>
        </>
  )
}

export default Main