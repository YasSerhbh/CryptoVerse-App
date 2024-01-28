import { View, Text, TouchableOpacity,  ActivityIndicator, FlatList, Linking } from 'react-native'
import React from 'react'
import useNewsFetch from '../hooks/useNewsFetch'
import { useTheme } from 'react-native-paper'
import {border} from './constants'
import NewsCard from './NewsCard'
import { useSelector } from 'react-redux'
import { I18n } from 'i18n-js'

var content = {
    en: {
        g: 'Latest Crypto News',
        g2: 'Show More',
        g3: 'See More Details on the website'
    },
    fr: {
        g: 'Dernières nouvelles sur les crypto',
        g2: 'Voir Plus',
        g3: 'Voir plus de détails sur le site web'
    }
}

const i18n = new I18n(content)

i18n.enableFallback = true;

const TopNews = ({navigation}) => {
    
    const {lang} = useSelector(s => s.language)
    const {data, isLoading, error, refetch} = useNewsFetch('3', lang === 'en' ? 'crypto%20Currencies' : 'crypto-monnaie')
    // const isLoading = true
    const theme = useTheme()

    React.useEffect(() => {
        refetch()
    }, [lang])

    i18n.locale = lang

    if (isLoading) return <ActivityIndicator size='large' color={theme.colors.primary} style={{marginVertical: 50}} />

    // console.log(data)

  return (
    <View style={{marginVertical: 20}}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 24,
        color: theme.colors.onBackground,
        marginBottom: 20,
        marginHorizontal: '5%'
        }}>{i18n.t('g')}</Text>

        {/* <FlatList 
            data={data?.value}
            renderItem={({item}) => <NewsCard item={item} />}
        /> */}

        {
            Array.isArray(data) && data?.map((item) => (<NewsCard item={item} key={`news-${Math.floor(Math.random() * 1000000000)}`} />))
        }

        <TouchableOpacity onPress={() => navigation.navigate('News')} style={{
            marginHorizontal: '10%',
            marginVertical: 16
        }}><Text style={{
            color: theme.colors.primary,
            fontSize: 16,
            fontWeight: '500'
        }}>{i18n.t("g2")}</Text></TouchableOpacity>


        <TouchableOpacity onPress={() => Linking.openURL(`https://yasserbm.tech/`)} style={{
            marginHorizontal: '10%',
            marginVertical: 16
        }}><Text style={{
            color: theme.colors.primary,
            fontSize: 16,
            fontWeight: '500'
        }}>{i18n.t("g3")}</Text></TouchableOpacity>
    </View>
  )
}

export default TopNews