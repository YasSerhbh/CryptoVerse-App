import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { Info, TopCryptos, TopNews } from '../../components'
import {border} from '../../components/constants'
import { RefreshControl } from 'react-native'


const Home = ({navigation}) => {

    const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView style={{flex: 1}} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Info />
      <TopCryptos navigation={navigation} />
      <TopNews navigation={navigation} />
    </ScrollView>
    </SafeAreaView>
  )
}

export default Home