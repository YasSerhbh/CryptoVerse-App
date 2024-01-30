import { View, Text, TextInput, FlatList, ActivityIndicator, RefreshControl, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper'
import useCoinFetch from '../../hooks/useCoinFetch'
import {CryptoCard} from '../../components'
import { useSelector } from 'react-redux'
import {I18n} from 'i18n-js'

var content = {
    en: {
        g1: 'Search'
    },
    es: {
        g1: 'Buscar'
    },
    fr: {
        g1: 'Rechercher'
    }
}

const i18n = new I18n(content)

i18n.enableFallback = true;

const CryptoCurrencies = ({navigation}) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [trueData, setTrueData] = useState(data?.data?.coins)
    const {lang} = useSelector(state => state.language)

    i18n.locale = lang

    const theme = useTheme()

    const {data, isLoading, error, refetch} = useCoinFetch('coins', {limit: 100})

    const handleSearch = (term) => {
        setSearchTerm(term)
    }


    const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
        refetch()
      setRefreshing(false);
    }, 1000);
  }, []);


    useEffect(() => {
       setTrueData(data?.data?.coins.filter((e) => e.name.toLowerCase().includes(searchTerm.toLowerCase())))
    }, [searchTerm])

    if (isLoading) return <ActivityIndicator size='large' color={theme.colors.primary} style={{marginVertical: 50}} />

  return (
    <SafeAreaView>
    <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
    <View style={{flex: 1}}>
      <TextInput 
        style={{
            borderWidth: 0.3,
            borderColor: theme.colors.secondary,
            width: '80%',
            marginHorizontal: '10%',
            marginVertical: 20,
            height: 46,
            backgroundColor: theme.colors.background,
            color: theme.colors.onBackground,
            fontSize: 18,
            borderRadius: 20,
            paddingLeft: 10
            }}
        placeholder={i18n.t('g1')}
        placeholderTextColor={theme.colors.secondary}
        onChangeText={term => handleSearch(term)}
        cursorColor={theme.colors.onBackground}
      />

      {error ? <Text style={{textAlign: 'center', marginVertical: 40}}>Error: {error}</Text> 
      :
      
          trueData ? trueData.map((item) => (<CryptoCard coin={item} navigation={navigation} key={`coin-${item.rank}`} />))
          : data?.data?.coins.map((item) => (<CryptoCard coin={item} navigation={navigation} key={`coin-${item.rank}`} />))
          }

    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default CryptoCurrencies