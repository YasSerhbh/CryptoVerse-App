import { View, Text, StatusBar, useWindowDimensions } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Home from './main-screens/Home'
import CryptoCurrencies from './main-screens/CryptoCurrencies'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import News from './main-screens/News'
import { useTheme } from 'react-native-paper'
import Settings from './main-screens/Settings'
import { useSelector } from 'react-redux'
import { I18n } from 'i18n-js'

const Tab = createMaterialBottomTabNavigator()

var content = {
    en: {
        g1: 'Home',
        g2: 'Cryptos',
        g3: 'News',
        g4: 'Settings'
    },
    es: {
        g1: 'Inicio',
        g2: 'Criptos',
        g3: 'Noticias',
        g4: 'Ajustes'
    },
    fr: {
        g1: 'Acceuil',
        g2: 'Cryptos',
        g3: 'Actualités',
        g4: 'Paramètres'
    }
}

const i18n = new I18n(content)

i18n.enableFallback = true;


const Main = () => {
    const {width} = useWindowDimensions()
    const theme = useTheme()

    const {lang} = useSelector(state => state.language)

    i18n.locale = lang

    
  return (
    <>
            <StatusBar
                animated={true}
                backgroundColor="#6651a4"
                hidden={false}
                barStyle='light-content'
            />
        <Tab.Navigator barStyle={{backgroundColor: theme.colors.inverseOnSurface}} sceneAnimationEnabled>
            <Tab.Screen name='Home' component={Home} options={{
                    tabBarLabel: false,
                tabBarIcon: ({focused}) => (
                    <View style={{width: width / 4, height: 76, top: -14, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? theme.colors.primaryContainer : theme.colors.inverseOnSurface, borderRadius: 26}}>
                        <MaterialCommunityIcons name="home" color={focused ? theme.colors.primary : theme.colors.onBackground} size={27} />
                        <Text style={{fontSize: 12, color: focused ? theme.colors.primary : theme.colors.onBackground}}>{i18n.t("g1")}</Text>
                    </View>
                )
                }} />
            <Tab.Screen name='CryptoCurrencies' component={CryptoCurrencies} options={{
                tabBarLabel: false,
                tabBarIcon: ({focused}) => (
                    <View style={{width: width / 4, height: 76, top: -14, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? theme.colors.primaryContainer : theme.colors.inverseOnSurface, borderRadius: 26}}>
                        <MaterialCommunityIcons name="bitcoin" color={focused ? theme.colors.primary : theme.colors.onBackground} size={27} />
                        <Text style={{fontSize: 12, color: focused ? theme.colors.primary : theme.colors.onBackground}}>{i18n.t("g2")}</Text>
                    </View>
                )
                }} />
            <Tab.Screen name='News' component={News} options={{
                tabBarLabel: false,
                tabBarIcon: ({focused}) => (
                    <View style={{width: width / 4, height: 76, top: -14, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? theme.colors.primaryContainer : theme.colors.inverseOnSurface, borderRadius: 26}}>
                        <MaterialCommunityIcons name="newspaper-variant-multiple" color={focused ? theme.colors.primary : theme.colors.onBackground} size={27} />
                        <Text style={{fontSize: 12, color: focused ? theme.colors.primary : theme.colors.onBackground}}>{i18n.t("g3")}</Text>
                    </View>
                )
            }} />
            <Tab.Screen name='Settings' component={Settings} initialParams={{}} options={{
                tabBarLabel: false,
                tabBarIcon: ({focused}) => (
                    <View style={{width: width / 4, height: 76, top: -14, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? theme.colors.primaryContainer : theme.colors.inverseOnSurface, borderRadius: 26}}>
                        <MaterialCommunityIcons name="cog" color={focused ? theme.colors.primary : theme.colors.onBackground} size={27} />
                        <Text style={{fontSize: 12, color: focused ? theme.colors.primary : theme.colors.onBackground}}>{i18n.t("g4")}</Text>
                    </View>
                )
            }} />
        </Tab.Navigator>
        </>
  )
}

export default Main