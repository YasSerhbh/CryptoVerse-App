import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from 'react-native-paper';
import moment from 'moment';
import { useSelector } from 'react-redux'
import {I18n} from 'i18n-js'



var content = {
    en: {
        g1: 'Read More'
    },
    es: {
        g1: 'Leer más'
    },
    fr: {
        g1: 'Voir Plus'
    }
}

const i18n = new I18n(content)

i18n.enableFallback = true;


const NewsCard = ({item}) => {
    
    var demoImg = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'
    
    const theme = useTheme()
    const {lang} = useSelector(state => state.language)

    i18n.locale = lang


  return (
     <View style={{...styles.container, backgroundColor: theme.colors.background}}>
    <Image source={{ demoImg }} style={styles.image} />
      <View style={styles.content}>
        <Text style={{...styles.title, color: theme.colors.onBackground}}>{item.title}</Text>
        <Text style={{...styles.description, color: theme.colors.secondary}}>{item.description.substr(0, 150)}...
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}><Text style={{...styles.description,marginBottom: 0, fontWeight: '500', color: theme.colors.primary}}>{i18n.t('g1')}</Text></TouchableOpacity>
        </Text>
        <View style={styles.providerContainer}>
          <Image source={{ demoImg }} style={styles.providerIcon} />
          <Text style={{...styles.providerName, color: theme.colors.secondary}}>Coin Desk</Text>
      </View>
        <Text style={{fontSize: 12, color: theme.colors.secondary}}>{moment(item?.date).startOf("ss").fromNow()}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    marginVertical: 8,
    padding: 16,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
  },
  providerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16
  },
  providerIcon: {
    width: 25,
    height: 25,
    marginRight: 4,
  },
  providerName: {
    fontSize: 12,
  },
});

export default NewsCard;