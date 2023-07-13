import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import { border } from './constants'
import { useTheme } from 'react-native-paper'
import useCoinFetch from '../hooks/useCoinFetch'
import CryptoCard from './CryptoCard'
import { useSelector } from 'react-redux'
import { I18n } from 'i18n-js'

var content = {
    en: {
        g: 'Top 5 Cryptos',
        g2: 'Show More'
    },
    fr: {
        g: 'Top 5 des cryptos',
        g2: 'Voir plus'
    }
}

const i18n = new I18n(content)

i18n.enableFallback = true;


const TopCryptos = ({navigation}) => {

    const {data, isLoading, error, refetch} = useCoinFetch('coins', {limit: 5})
    // const isLoading = true
    const theme = useTheme()
    const {lang} = useSelector(s => s.language)

    i18n.locale = lang

    if (isLoading) return <ActivityIndicator size='large' color={theme.colors.primary} style={{marginVertical: 50}} />



  return (
    <View style={{marginVertical: 10}}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 24,
        color: theme.colors.onBackground,
        marginBottom: 20,
        marginHorizontal: '5%'
        }}>{i18n.t("g")}</Text>

        {/* <FlatList
            data={data?.data?.coins}
            renderItem={({item}) => <CryptoCard coin={item} navigation={navigation} />}
            keyExtractor={(item) => `coin-${item.rank}`}

        /> */}

        {
            data?.data?.coins.map((item) => (<CryptoCard coin={item} navigation={navigation} key={`coin-${item.rank}`} />))
        }

        <TouchableOpacity onPress={() => navigation.navigate('CryptoCurrencies')} style={{
            marginHorizontal: '10%',
            marginVertical: 16
        }}><Text style={{
            color: theme.colors.primary,
            fontSize: 16,
            fontWeight: '500'
        }}>{i18n.t("g2")}</Text></TouchableOpacity>
    </View>
  )
}

export default TopCryptos