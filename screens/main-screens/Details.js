import { View, Text , ActivityIndicator, ScrollView, FlatList, TouchableOpacity, Linking, RefreshControl} from 'react-native'
import React from 'react'
import useCoinFetch from '../../hooks/useCoinFetch'
// import useTranslate from '../../hooks/useTranslate'
import { useTheme } from 'react-native-paper'
import {border} from '../../components/constants'
import { Foundation, FontAwesome, MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import millify from 'millify'
import { SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import { I18n } from 'i18n-js'

var content = {
    en: {
        g1_1: 'An overview showing the statistics of ',
        g1_2: ', such as the base and quote currency, the rank, and trading volume.',
        g2: 'Price To USD',
        g3: 'Rank',
        g4: '24h Volume',
        g5: 'Market Cap',
        g6: 'All-Time-High',
        g07: 'Other Stats Info',
        g7: 'Number Of Markets',
        g8: 'Number Of Exchanges',
        g9: 'Approved Supply',
        g10: 'Total Supply',
        g11: 'Circulating Supply',
        g12: 'What is ',
    },
    es: {
         g1_1: 'Una descripción general que muestra las estadísticas de ',
         g1_2: ', como la moneda base y cotizada, la clasificación y el volumen de operaciones.',
         g2: 'Precio a USD',
         g3: 'Rango',
         g4: 'Volumen 24h',
         g5: 'Captación de mercado',
         g6: 'Máximo histórico',
         g07: 'Otra información estadística',
         g7: 'Número de mercados',
         g8: 'Número de intercambios',
         g9: 'Suministro aprobado',
         g10: 'Oferta Total',
         g11: 'Suministro circulante',
         g12: '¿Qué es ',
    },
    fr: {
        g1_1: 'Un aperçu montrant les statistiques de ',
        g1_2: ', tels que la devise de base et de cotation, le classement et le volume des transactions.',
        g2: 'Prix en USD',
        g3: 'Classement',
        g4: 'Volume 24h',
        g5: 'Capitalisation boursière',
        g6: 'Record de tous les temps',
        g07: 'Autres informations sur les statistiques',
        g7: 'Nombre de marchés',
        g8: "Nombre d'échanges",
        g9: 'Fourniture approuvée',
        g10: 'Approvisionnement total',
        g11: 'Alimentation en circulation',
        g12: "C'est quoi le ",
    }
}

const i18n = new I18n(content)

i18n.enableFallback = true;

const Details = ({route, navigation}) => {

    const [refreshing, setRefreshing] = React.useState(false);
    const {lang} = useSelector(s => s.language)

    i18n.locale = lang

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
        refetch()
      setRefreshing(false);
    }, 2000);
  }, []);

    const {id} = route.params

    const {data, isLoading, error, refetch} = useCoinFetch(`coin/${id}`)



    // const {tData} = useTranslate(data?.data?.coin?.description)

    // tData && console.log(tData?.data?.translations[0]?.translatedText)



    const theme = useTheme()

    if (isLoading) return <ActivityIndicator size='large' color={theme.colors.primary} style={{marginVertical: 50}} />

  return (
    <SafeAreaView>
    <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        
    {error ? <Text style={{textAlign: 'center', marginVertical: 40}}>Error: {error}</Text>  
    :<View style={{marginVertical: 40,backGroundColor: theme.colors.background, marginHorizontal: '6%' }}>
        <Text style={{
            textAlign: 'center',
            color: theme.colors.primary, 
            fontSize: 26,
            fontWeight: 'bold'
            }}>
                {lang === 'en' ?
                    `${data?.data?.coin?.name} (${data?.data?.coin?.symbol}) Details`:
                    `Détails sur ${data?.data?.coin?.name} (${data?.data?.coin?.symbol})` 
                }
                </Text>

        <View style={{
            marginVertical: 20
        }}>
            <Text style={{
                color: theme.colors.primary,
                fontWeight: '500',
                fontSize: 22,
                marginVertical: 5
            }}>
                {lang === 'en' ?
                `${data?.data?.coin.name} Value Statistics`:
                `Statistiques sur la valeur du ${data?.data?.coin.name}`
        }</Text>

            <Text style={{color: theme.colors.onBackground, paddingLeft: 3}}>{i18n.t('g1_1') + data?.data?.coin.name + i18n.t('g1_2')}</Text>

            <View style={{marginVertical: 26}}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    marginHorizontal: '5%',
                    paddingVertical: 20,
                    borderBottomWidth: 0.3,
                    borderBottomColor: theme.colors.surfaceVariant
                    }}>
                    <View style={{flexDirection: 'row'}}>
                    <Foundation name="dollar" size={24} color={theme.colors.onBackground} style={{marginRight: 15}} />
                    <Text style={{color: theme.colors.secondary}} >{i18n.t('g2')}</Text>
                    </View>
                    <Text style={{fontWeight: 700, color: theme.colors.onBackground}}>$ {millify(data?.data?.coin?.price)}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    marginHorizontal: '5%',
                    paddingVertical: 20,
                    borderBottomWidth: 0.3,
                    borderBottomColor: theme.colors.surfaceVariant
                    }}>
                    <View style={{flexDirection: 'row'}}>
                    <FontAwesome name="hashtag" size={16} color={theme.colors.onBackground} style={{marginRight: 15}} />
                    <Text style={{color: theme.colors.secondary}} >{i18n.t('g3')}</Text>
                    </View>
                    <Text style={{fontWeight: 700, color: theme.colors.onBackground}}>{data?.data?.coin?.rank}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    marginHorizontal: '5%',
                    paddingVertical: 20,
                    borderBottomWidth: 0.3,
                    borderBottomColor: theme.colors.surfaceVariant
                    }}>
                    <View style={{flexDirection: 'row'}}>
                    <MaterialIcons name="flash-on" size={20} color={theme.colors.onBackground} style={{marginRight: 15}} />
                    <Text style={{color: theme.colors.secondary}} >{i18n.t('g4')}</Text>
                    </View>
                    <Text style={{fontWeight: 700, color: theme.colors.onBackground}}>$ {millify(data?.data?.coin['24hVolume'])}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    marginHorizontal: '5%',
                    paddingVertical: 20,
                    borderBottomWidth: 0.3,
                    borderBottomColor: theme.colors.surfaceVariant
                    }}>
                    <View style={{flexDirection: 'row'}}>
                    <Foundation name="dollar" size={24} color={theme.colors.onBackground} style={{marginRight: 15}} />
                    <Text style={{color: theme.colors.secondary}} >{i18n.t('g5')}</Text>
                    </View>
                    <Text style={{fontWeight: 700, color: theme.colors.onBackground}}>$ {millify(data?.data?.coin?.marketCap)}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    marginHorizontal: '5%',
                    paddingVertical: 20,
                    borderBottomWidth: 0.3,
                    borderBottomColor: theme.colors.surfaceVariant
                    }}>
                    <View style={{flexDirection: 'row'}}>
                    <Ionicons name="trophy" size={24} color={theme.colors.onBackground} style={{marginRight: 15}} />
                    <Text style={{color: theme.colors.secondary}} >{i18n.t('g6')}</Text>
                    </View>
                    <Text style={{fontWeight: 700, color: theme.colors.onBackground}}>$ {millify(data?.data?.coin?.allTimeHigh?.price)}</Text>
                </View>
            </View>

        </View>


        <View style={{
            marginVertical: 20
        }}>
            <Text style={{
                color: theme.colors.primary,
                fontWeight: '500',
                fontSize: 22,
                marginVertical: 5
            }}>{i18n.t('g07')}</Text>




            <View style={{marginVertical: 26}}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    marginHorizontal: '5%',
                    paddingVertical: 20,
                    borderBottomWidth: 0.3,
                    borderBottomColor: theme.colors.surfaceVariant
                    }}>
                    <View style={{flexDirection: 'row'}}>
                    <AntDesign name="linechart" size={24} color={theme.colors.onBackground} style={{marginRight: 15}} />
                    <Text style={{color: theme.colors.secondary}} >{i18n.t('g7')}</Text>
                    </View>
                    <Text style={{fontWeight: 700, color: theme.colors.onBackground}}>{millify(data?.data?.coin?.numberOfMarkets)}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    marginHorizontal: '5%',
                    paddingVertical: 20,
                    borderBottomWidth: 0.3,
                    borderBottomColor: theme.colors.surfaceVariant
                    }}>
                    <View style={{flexDirection: 'row'}}>
                    <FontAwesome name="exchange" size={24} color={theme.colors.onBackground} style={{marginRight: 15}} />
                    <Text style={{color: theme.colors.secondary}} >{i18n.t('g8')}</Text>
                    </View>
                    <Text style={{fontWeight: 700, color: theme.colors.onBackground}}>{millify(data?.data?.coin?.numberOfExchanges)}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    marginHorizontal: '5%',
                    paddingVertical: 20,
                    borderBottomWidth: 0.3,
                    borderBottomColor: theme.colors.surfaceVariant
                    }}>
                    <View style={{flexDirection: 'row'}}>
                    <Ionicons name="warning-outline" size={24} color={theme.colors.onBackground} style={{marginRight: 15}} />
                    <Text style={{color: theme.colors.secondary}} >{i18n.t('g9')}</Text>
                    </View>
                    <Text style={{fontWeight: 700, color: theme.colors.onBackground}}>{data?.data?.coin?.supply?.confirmed ? <AntDesign name="check" size={24} color={theme.colors.onBackground} style={{marginRight: 15}} /> : <AntDesign name="close" size={24} color={theme.colors.onBackground} style={{marginRight: 15}} />}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    marginHorizontal: '5%',
                    paddingVertical: 20,
                    borderBottomWidth: 0.3,
                    borderBottomColor: theme.colors.surfaceVariant
                    }}>
                    <View style={{flexDirection: 'row'}}>
                    <Ionicons name="warning-outline" size={24} color={theme.colors.onBackground} style={{marginRight: 15}} />
                    <Text style={{color: theme.colors.secondary}} >{i18n.t('g10')}</Text>
                    </View>
                    <Text style={{fontWeight: 700, color: theme.colors.onBackground}}>$ {millify(data?.data?.coin?.supply?.total)}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    marginHorizontal: '5%',
                    paddingVertical: 20,
                    borderBottomWidth: 0.3,
                    borderBottomColor: theme.colors.surfaceVariant
                    }}>
                    <View style={{flexDirection: 'row'}}>
                    <Ionicons name="warning-outline" size={24} color={theme.colors.onBackground} style={{marginRight: 15}} />
                    <Text style={{color: theme.colors.secondary}} >{i18n.t('g11')}</Text>
                    </View>
                    <Text style={{fontWeight: 700, color: theme.colors.onBackground}}>$ {millify(data?.data?.coin?.supply?.circulating)}</Text>
                </View>
            </View>

        </View>


        <View style={{
            marginVertical: 20
        }}>
            <Text style={{
                color: theme.colors.primary,
                fontWeight: '500',
                fontSize: 22,
                marginVertical: 5
            }}>{i18n.t('g12') + data?.data?.coin?.name + '?'}</Text>

        <Text style={{
            color: theme.colors.onBackground,
            paddingLeft: 3,
            marginVertical: 10,
            fontSize: 17
            
             }}>{data?.data?.coin?.description}</Text>


        </View>


        <View style={{
            marginVertical: 20
        }}>
            <Text style={{
                color: theme.colors.primary,
                fontWeight: '500',
                fontSize: 22,
                marginVertical: 5
            }}>{
                lang === "en" ?
                    `${data?.data?.coin?.name} Links`:
                    `Liens ${data?.data?.coin?.name}`
            }</Text>

            {/* <FlatList 
                data={data?.data?.coin?.links}
                renderItem={({item}) => (
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '90%',
                        marginHorizontal: '5%',
                        paddingVertical: 20,
                        borderBottomWidth: 0.3,
                        borderBottomColor: theme.colors.surfaceVariant
                        }}>
                        <Text style={{color: theme.colors.secondary}} >{item.type}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(item.url)}><Text style={{fontWeight: 700, color: theme.colors.primary}}>{item.name}</Text></TouchableOpacity>
                    </View>
                )}
            /> */}

            {
                data?.data?.coin?.links.map((item) => (
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '90%',
                        marginHorizontal: '5%',
                        paddingVertical: 20,
                        borderBottomWidth: 0.3,
                        borderBottomColor: theme.colors.surfaceVariant
                        }} key={Math.floor(Math.random() * 10000000)}>
                        <Text style={{color: theme.colors.secondary}} >{item.type}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(item.url)}><Text style={{fontWeight: 700, color: theme.colors.primary}}>{item.name}</Text></TouchableOpacity>
                    </View>
                ))
            }

        </View>
    </View>}
    </ScrollView>
    </SafeAreaView>
  )
}

export default Details