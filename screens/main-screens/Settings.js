import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useTheme, Switch } from 'react-native-paper'
import {Picker} from '@react-native-picker/picker';
import { switchState } from '../../redux/darkModeSlice';
import { switchLang } from '../../redux/langSlice';
import { useDispatch, useSelector } from 'react-redux';
import {I18n} from "i18n-js"

var content = {
    en: {
        g1: "Dark Mode",
        g2: "Language"
    },
    fr: {
        g1: 'Mode Sombre',
        g2: 'Langue'
    }
}

const i18n = new I18n(content)

i18n.enableFallback = true;


const Settings = () => {

    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const dispatch = useDispatch()
    const {active} = useSelector(state => state.darkMode)
    // const {lang} = useSelector(state => state.language)

    i18n.locale = selectedLanguage
  
    const handleDarkModeToggle = () => {
        setDarkModeEnabled(!darkModeEnabled);
        dispatch(switchState(darkModeEnabled))
    };

    const handleLanguageChange = (value) => {
        setSelectedLanguage(value);
        dispatch(switchLang(value))
      };

    const theme = useTheme()



  return (
    <SafeAreaView style={{...styles.container, backgroundColor: theme.colors.background}}>
      <View style={{...styles.option, backgroundColor: theme.colors.background}}>
        <Text style={{...styles.optionText, color: theme.colors.onBackground}}>{i18n.t("g1")}</Text>
        <Switch
          value={active}
          onValueChange={handleDarkModeToggle}
          thumbColor="#ffffff"
          trackColor={{ false: '#d3d3d3', true: '#81b0ff' }}
          theme={theme}
        />
      </View>
      <View style={{...styles.option, backgroundColor: theme.colors.background}}>
        <Text style={{...styles.optionText, color: theme.colors.onBackground}}>{i18n.t("g2")}</Text>
        <Picker
          selectedValue={selectedLanguage}
          style={{...styles.picker, color: theme.colors.onBackground}}
          onValueChange={handleLanguageChange}
        >
          <Picker.Item label="English" value="en" />
          {/* <Picker.Item label="Espanol" value="es" /> */}
          <Picker.Item label="Français" value="fr" />
        </Picker>
      </View>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
        paddingTop: 32,
      },
      option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        elevation: 3,
      },
      optionText: {
        fontSize: 16,
        color: '#333333',
    },
    picker: {
        flex: 1,
        marginLeft: 8,
      },
});

export default Settings