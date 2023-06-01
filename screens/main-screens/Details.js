import { View, Text , ActivityIndicator, ScrollView, FlatList, TouchableOpacity, Linking, RefreshControl} from 'react-native'
import React from 'react'
import useCoinFetch from '../../hooks/useCoinFetch'
import { useTheme } from 'react-native-paper'
import {border} from '../../components/constants'
import { Foundation, FontAwesome, MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import millify from 'millify'
import { SafeAreaView } from 'react-native'

const Details = ({route, navigation}) => {

    const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
        refetch()
      setRefreshing(false);
    }, 2000);
  }, []);

    const {id} = route.params

    const {data, isLoading, error, refetch} = useCoinFetch(`coin/${id}`)

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
            }}>{data?.data?.coin?.name} ({data?.data?.coin?.symbol}) Details</Text>

        <View style={{
            marginVertical: 20
        }}>
            <Text style={{
                color: theme.colors.primary,
                fontWeight: '500',
                fontSize: 22,
                marginVertical: 5
            }}>{data?.data?.coin.name} Value Statistics</Text>

            <Text style={{color: theme.colors.onBackground, paddingLeft: 3}}>An overview showing the statistics of {data?.data?.coin.name} , such as the base and quote currency, the rank, and trading volume.</Text>

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
                    <Text style={{color: theme.colors.secondary}} >Price To USD</Text>
                    </View>
                    <Text style={{fontWeight: 700}}>$ {millify(data?.data?.coin?.price)}</Text>
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
                    <Text style={{color: theme.colors.secondary}} >Rank</Text>
                    </View>
                    <Text style={{fontWeight: 700}}>{data?.data?.coin?.rank}</Text>
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
                    <Text style={{color: theme.colors.secondary}} >24h Volume</Text>
                    </View>
                    <Text style={{fontWeight: 700}}>$ {millify(data?.data?.coin['24hVolume'])}</Text>
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
                    <Text style={{color: theme.colors.secondary}} >Market Cap</Text>
                    </View>
                    <Text style={{fontWeight: 700}}>$ {millify(data?.data?.coin?.marketCap)}</Text>
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
                    <Text style={{color: theme.colors.secondary}} >All-Time-High</Text>
                    </View>
                    <Text style={{fontWeight: 700}}>$ {millify(data?.data?.coin?.allTimeHigh?.price)}</Text>
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
            }}>Other Stats Info</Text>




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
                    <Text style={{color: theme.colors.secondary}} >Number Of Markets</Text>
                    </View>
                    <Text style={{fontWeight: 700}}>{millify(data?.data?.coin?.numberOfMarkets)}</Text>
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
                    <Text style={{color: theme.colors.secondary}} >Number Of Exchanges</Text>
                    </View>
                    <Text style={{fontWeight: 700}}>{millify(data?.data?.coin?.numberOfExchanges)}</Text>
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
                    <Text style={{color: theme.colors.secondary}} >Approved Supply</Text>
                    </View>
                    <Text style={{fontWeight: 700}}>{data?.data?.coin?.supply?.confirmed ? <AntDesign name="check" size={24} color={theme.colors.onBackground} style={{marginRight: 15}} /> : <AntDesign name="close" size={24} color={theme.colors.onBackground} style={{marginRight: 15}} />}</Text>
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
                    <Text style={{color: theme.colors.secondary}} >Total Supply</Text>
                    </View>
                    <Text style={{fontWeight: 700}}>$ {millify(data?.data?.coin?.supply?.total)}</Text>
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
                    <Text style={{color: theme.colors.secondary}} >Circulating Supply</Text>
                    </View>
                    <Text style={{fontWeight: 700}}>$ {millify(data?.data?.coin?.supply?.circulating)}</Text>
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
            }}>What is {data?.data?.coin?.name} ?</Text>

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
            }}>{data?.data?.coin?.name} Links</Text>

            <FlatList 
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
            />

        </View>
    </View>}
    </ScrollView>
    </SafeAreaView>
  )
}

export default Details