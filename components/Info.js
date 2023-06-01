import { View, Text, ActivityIndicator } from 'react-native'
import useCoinFetch from '../hooks/useCoinFetch'
import { useTheme } from 'react-native-paper'
import millify from 'millify'
import {border} from './constants'


const Info = () => {

    const {data, isLoading, error, refetch} = useCoinFetch('coins', {limit: 1})
    // const isLoading = true
    const theme = useTheme()

    if (isLoading) return <ActivityIndicator size='large' color={theme.colors.primary} style={{marginVertical: 50}} />

  return (
    <View style={{
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: 26
        }}>

        {error ? <Text style={{textAlign: 'center', marginVertical: 40}}>Error: {error}</Text> 
        : <View>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 24,
        color: theme.colors.onBackground,
        marginBottom: 20
        }}>Global Crypto Statistics</Text>

        <View style={{
            margin: 10,
            marginVertical: 10
        }}>
            <Text style={{color: theme.colors.secondary, fontSize: 17}}>Total Crypto Currencies:</Text>
            <Text style={{color: theme.colors.onBackground, fontSize: 23, marginTop: 4, marginHorizontal: 6}}>{data?.data.stats.total > 999999 ? millify(data?.data.stats.total) : data?.data.stats.total}</Text>
        </View>
        <View style={{
            margin: 10,
            marginVertical: 10
        }}>
            <Text style={{color: theme.colors.secondary, fontSize: 17}}>Total Market Cap:</Text>
            <Text style={{color: theme.colors.onBackground, fontSize: 23, marginTop: 4, marginHorizontal: 6}}>{data?.data.stats.totalMarketCap > 999999 ? millify(data?.data.stats.totalMarketCap) : data?.data.stats.totalMarketCap}</Text>
        </View>
        <View style={{
            margin: 10,
            marginVertical: 10
        }}>
            <Text style={{color: theme.colors.secondary, fontSize: 17}}>Total Exchanges:</Text>
            <Text style={{color: theme.colors.onBackground, fontSize: 23, marginTop: 4, marginHorizontal: 6}}>{data?.data.stats.totalExchanges > 999999 ? millify(data?.data.stats.totalExchanges) : data?.data.stats.totalExchanges}</Text>
        </View>
        <View style={{
            margin: 10,
            marginVertical: 10
        }}>
            <Text style={{color: theme.colors.secondary, fontSize: 17}}>Total Markets:</Text>
            <Text style={{color: theme.colors.onBackground, fontSize: 23, marginTop: 4, marginHorizontal: 6}}>{data?.data.stats.totalMarkets > 999999 ? millify(data?.data.stats.totalMarkets) : data?.data.stats.totalMarkets}</Text>
        </View>
        <View style={{
            margin: 10,
            marginVertical: 10
        }}>
            <Text style={{color: theme.colors.secondary, fontSize: 17}}>Total 24h Volume:</Text>
            <Text style={{color: theme.colors.onBackground, fontSize: 23, marginTop: 4, marginHorizontal: 6}}>{data?.data.stats.total24hVolume > 999999 ? millify(data?.data.stats.total24hVolume) : data?.data.stats.total24hVolume}</Text>
        </View>
        </View>}
    </View>
  )
}

export default Info