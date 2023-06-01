import { View, Text, TextInput, FlatList, ActivityIndicator, RefreshControl, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper'
import useCoinFetch from '../../hooks/useCoinFetch'
import {CryptoCard} from '../../components'

const CryptoCurrencies = ({navigation}) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [trueData, setTrueData] = useState(data?.data?.coins)

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
            height: 36,
            backgroundColor: theme.colors.background,
            color: theme.colors.onBackground,
            fontSize: 18
            }}
        placeholder="Search"
        onChangeText={term => handleSearch(term)}
        cursorColor={theme.colors.onBackground}
      />

      {error ? <Text style={{textAlign: 'center', marginVertical: 40}}>Error: {error}</Text> 
      :<FlatList 
            data={trueData ? trueData : data?.data?.coins}
            renderItem={({item}) => <CryptoCard coin={item} navigation={navigation} />}
          />}

    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default CryptoCurrencies