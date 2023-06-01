import { View, Text, FlatList, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import useNewsFetch from '../../hooks/useNewsFetch'
import NewsCard from '../../components/NewsCard'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native'

const News = () => {

    const {data, isLoading, error, refetch} = useNewsFetch('15')
    // const isLoading = true
    const theme = useTheme()

    
    
    const [refreshing, setRefreshing] = React.useState(false);

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
      {error ? <Text style={{textAlign: 'center', marginVertical: 40}}>Error: {error}</Text> : <FlatList 
            data={data?.value}
            renderItem={({item}) => <NewsCard item={item} />}
        />}
    </ScrollView>
    </SafeAreaView>
  )
}

export default News