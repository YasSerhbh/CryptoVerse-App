import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import {I18n} from 'i18n-js'

var content = {
    en: {
        g1: 'Welcome To CryptoVerse',
        g2: 'All informations you need about cryptocurrencies in one place',
        g3: 'Get Started'
    },
    fr: {
        g1: 'Bienvenue sur CryptoVerse',
        g2: 'Toutes les informations dont vous avez besoin sur les crypto-monnaies en un seul endroit',
        g3: 'Commencer'
    }
}

const i18n = new I18n(content)

i18n.enableFallback = true;



const Welcome = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Main');
  };

  const {lang} = useSelector(state => state.language)

  i18n.locale = lang

  const theme = useTheme()

  return (
    <SafeAreaView style={{...styles.container, backgroundColor: '#e9deff'}}>

        <StatusBar
        animated={true}
        backgroundColor="#6651a4"
        hidden={false}
        barStyle='light-content'
        />

        <View style={styles.background}>
      </View>

      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/512.png')} style={styles.logoImage} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{i18n.t("g1")}</Text>
        <Text style={styles.subtitle}>{i18n.t("g2")}</Text>
      </View>

      <TouchableOpacity style={{...styles.button, backgroundColor: '#6651a4'}} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>{i18n.t("g3")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoImage: {
    width: 190,
    height: 190,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 5
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
});


export default Welcome