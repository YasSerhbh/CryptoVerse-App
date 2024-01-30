import { View, Text, ActivityIndicator } from 'react-native'
import useCoinFetch from '../hooks/useCoinFetch'
import { useTheme } from 'react-native-paper'
import millify from 'millify'
import {border} from './constants'
import { useSelector } from 'react-redux'
import {I18n} from 'i18n-js'

var content = {
    en: {
        gl: 'Global Crypto Statistics',
        g1: 'Total Crypto Currencies:',
        g2: "Total Market Cap:",
        g3: "Total Exchanges:",
        g4: "Total Markets:",
        g5: "Total 24h Volume:",
    },
    es: {
         gl: 'Estadísticas criptográficas globales',
         g1: 'Total de criptomonedas:',
         g2: "Capacidad de mercado total:",
         g3: "Intercambios totales:",
         g4: "Mercados totales:",
         g5: "Volumen total 24h:",
    },
    fr: {
        gl: 'Statistiques sur les crypto-monnaies',
        g1: 'Total des crypto-devises:',
        g2: "Capitalisation boursière totale:",
        g3: "Échanges totaux:",
        g4: "Total des marchés:",
        g5: "Volume total sur 24h:",
    }
}

const i18n = new I18n(content)

i18n.enableFallback = true;

const Info = () => {

    const {data, isLoading, error, refetch} = useCoinFetch('coins', {limit: 1})
    // const isLoading = true
    const theme = useTheme()

    const {lang} = useSelector(state => state.language)

    i18n.locale = lang

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
        }}>{i18n.t('gl')}</Text>

        <View style={{
            margin: 10,
            marginVertical: 10
        }}>
            <Text style={{color: theme.colors.secondary, fontSize: 17}}>{i18n.t('g1')}</Text>
            <Text style={{color: theme.colors.onBackground, fontSize: 23, marginTop: 4, marginHorizontal: 6}}>{data?.data.stats.total > 999999 ? millify(data?.data.stats.total) : data?.data.stats.total}</Text>
        </View>
        <View style={{
            margin: 10,
            marginVertical: 10
        }}>
            <Text style={{color: theme.colors.secondary, fontSize: 17}}>{i18n.t('g2')}</Text>
            <Text style={{color: theme.colors.onBackground, fontSize: 23, marginTop: 4, marginHorizontal: 6}}>{data?.data.stats.totalMarketCap > 999999 ? millify(data?.data.stats.totalMarketCap) : data?.data.stats.totalMarketCap}</Text>
        </View>
        <View style={{
            margin: 10,
            marginVertical: 10
        }}>
            <Text style={{color: theme.colors.secondary, fontSize: 17}}>{i18n.t('g3')}</Text>
            <Text style={{color: theme.colors.onBackground, fontSize: 23, marginTop: 4, marginHorizontal: 6}}>{data?.data.stats.totalExchanges > 999999 ? millify(data?.data.stats.totalExchanges) : data?.data.stats.totalExchanges}</Text>
        </View>
        <View style={{
            margin: 10,
            marginVertical: 10
        }}>
            <Text style={{color: theme.colors.secondary, fontSize: 17}}>{i18n.t('g4')}</Text>
            <Text style={{color: theme.colors.onBackground, fontSize: 23, marginTop: 4, marginHorizontal: 6}}>{data?.data.stats.totalMarkets > 999999 ? millify(data?.data.stats.totalMarkets) : data?.data.stats.totalMarkets}</Text>
        </View>
        <View style={{
            margin: 10,
            marginVertical: 10
        }}>
            <Text style={{color: theme.colors.secondary, fontSize: 17}}>{i18n.t('g5')}</Text>
            <Text style={{color: theme.colors.onBackground, fontSize: 23, marginTop: 4, marginHorizontal: 6}}>{data?.data.stats.total24hVolume > 999999 ? millify(data?.data.stats.total24hVolume) : data?.data.stats.total24hVolume}</Text>
        </View>
        </View>}
    </View>
  )
}

export default Info