import { View, Text, TouchableOpacity,  ActivityIndicator, FlatList, Linking } from 'react-native'
import React from 'react'
import useNewsFetch from '../hooks/useNewsFetch'
import { useTheme } from 'react-native-paper'
import {border} from './constants'
import NewsCard from './NewsCard'

const TopNews = ({navigation}) => {

    const {data, isLoading, error, refetch} = useNewsFetch('3')
    // const isLoading = true
    const theme = useTheme()

    if (isLoading) return <ActivityIndicator size='large' color={theme.colors.primary} style={{marginVertical: 50}} />

  return (
    <View style={{marginVertical: 20}}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 24,
        color: theme.colors.onBackground,
        marginBottom: 20,
        marginHorizontal: '5%'
        }}>Latest Crypto News</Text>

        <FlatList 
            data={data?.value}
            renderItem={({item}) => <NewsCard item={item} />}
        />

        <TouchableOpacity onPress={() => navigation.navigate('News')} style={{
            marginHorizontal: '10%',
            marginVertical: 16
        }}><Text style={{
            color: theme.colors.primary,
            fontSize: 16,
            fontWeight: '500'
        }}>Show More</Text></TouchableOpacity>


        <TouchableOpacity onPress={() => Linking.openURL(`https://chikhloupi.lol/`)} style={{
            marginHorizontal: '10%',
            marginVertical: 16
        }}><Text style={{
            color: theme.colors.primary,
            fontSize: 16,
            fontWeight: '500'
        }}>See more details on ChikhLoupi</Text></TouchableOpacity>
    </View>
  )
}

export default TopNews