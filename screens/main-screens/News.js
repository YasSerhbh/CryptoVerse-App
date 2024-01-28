import { View, Text, FlatList, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import useNewsFetch from '../../hooks/useNewsFetch'
import NewsCard from '../../components/NewsCard'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'

const News = () => {

    const {lang} = useSelector(s => s.language)

    const {data, isLoading, error, refetch} = useNewsFetch('15', lang === "en" ? 'crypto%20Currencies' : 'crypto-monnaie')
    // const isLoading = true
    const theme = useTheme()

    
    
    const [refreshing, setRefreshing] = React.useState(false);

    React.useEffect(() => {
        refetch()
    }, [lang])

    const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
        refetch()
        setRefreshing(false);
    }, 1000);
}, []);


if (isLoading) return <ActivityIndicator size='large' color={theme.colors.primary} style={{marginVertical: 50}} />

  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView style={{flex: 1}}refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      { // error ? <Text style={{textAlign: 'center', marginVertical: 40}}>Error: {error}</Text> :
       


    //    <FlatList 
    //         data={data?.value}
    //         renderItem={({item}) => <NewsCard item={item} />}
    //     />


        
        Array.isArray(data) &&  data?.map((item) => (<NewsCard item={item} key={`news-${Math.floor(Math.random() * 1000000000)}`} />))
        }
    </ScrollView>
    </SafeAreaView>
  )
}

export default News