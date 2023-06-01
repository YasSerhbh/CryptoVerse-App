import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'



const Welcome = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Main');
  };

  const theme = useTheme()

  return (
    <SafeAreaView style={{...styles.container, backgroundColor: theme.colors.primaryContainer}}>

        <StatusBar
        animated={true}
        backgroundColor={theme.colors.primary}
        hidden={false}
        barStyle='light-content'
        />

        <View style={styles.background}>
      </View>

      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/512.png')} style={styles.logoImage} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome To CryptoVerse</Text>
        <Text style={styles.subtitle}>All informations you need about cryptocurrencies in one place</Text>
      </View>

      <TouchableOpacity style={{...styles.button, backgroundColor: theme.colors.primary}} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
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