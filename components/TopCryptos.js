import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import { border } from './constants'
import { useTheme } from 'react-native-paper'
import useCoinFetch from '../hooks/useCoinFetch'
import CryptoCard from './CryptoCard'

const TopCryptos = ({navigation}) => {

    const {data, isLoading, error, refetch} = useCoinFetch('coins', {limit: 5})
    // const isLoading = true
    const theme = useTheme()

    if (isLoading) return <ActivityIndicator size='large' color={theme.colors.primary} style={{marginVertical: 50}} />

  return (
    <View style={{marginVertical: 10}}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 24,
        color: theme.colors.onBackground,
        marginBottom: 20,
        marginHorizontal: '5%'
        }}>Top 5 Cryptos</Text>

        <FlatList
            data={data?.data?.coins}
            renderItem={({item}) => <CryptoCard coin={item} navigation={navigation} />}
            keyExtractor={(item) => `coin-${item.rank}`}

        />

        <TouchableOpacity onPress={() => navigation.navigate('CryptoCurrencies')} style={{
            marginHorizontal: '10%',
            marginVertical: 16
        }}><Text style={{
            color: theme.colors.primary,
            fontSize: 16,
            fontWeight: '500'
        }}>Show More</Text></TouchableOpacity>
    </View>
  )
}

export default TopCryptos