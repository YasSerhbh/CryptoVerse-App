import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import { useTheme } from 'react-native-paper'
import millify from 'millify'


const CryptoCard = ({coin, navigation}) => {

    const theme = useTheme()

  return (
    <TouchableWithoutFeedback  onPress={() => navigation.navigate('Details', {id: coin.uuid})} >
    <View
     style={{
        backgroundColor: theme.colors.background,
        shadowColor: theme.colors.primary,
        borderRadius: 20,
        marginHorizontal: '5%',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginVertical: 10
        }}>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 14,
            borderBottomWidth: 0.2,
            borderColor: theme.colors.surfaceVariant
        }}>
            <Text  style={{
                fontSize: 17,
                marginHorizontal: 20,
                color: coin.color
            }}>#{coin.rank} {coin.name}</Text>
            <Image source={{uri: coin.iconUrl.replace('svg', 'png')}} style={{width: 30, height: 30, marginHorizontal: 20}} />
        </View>

        <View style={{marginVertical: 20}}>
            <Text style={{
                fontSize: 13,
                marginHorizontal: 25,
                color: theme.colors.secondary,
                marginVertical: 7
            }}>Price: {millify(coin.price)}$</Text>
            <Text style={{
                fontSize: 13,
                marginHorizontal: 25,
                color: theme.colors.secondary,
                marginVertical: 7
            }}>MarketCap: {millify(coin.marketCap)}$</Text>
            <Text style={{
                fontSize: 13,
                marginHorizontal: 25,
                color: theme.colors.secondary,
                marginVertical: 7
            }}>Daily Change: {coin.change}%</Text>

        </View>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default CryptoCard