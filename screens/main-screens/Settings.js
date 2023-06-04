import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useTheme, Switch } from 'react-native-paper'
import {Picker} from '@react-native-picker/picker';
import { switchState } from '../../redux/darkModeSlice';
import { useDispatch, useSelector } from 'react-redux';


const Settings = () => {

    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const dispatch = useDispatch()
    const {active} = useSelector(state => state.darkMode)
  
    const handleDarkModeToggle = () => {
        setDarkModeEnabled(!darkModeEnabled);
        dispatch(switchState(darkModeEnabled))
    };

    const handleLanguageChange = (value) => {
        setSelectedLanguage(value);
      };

    const theme = useTheme()



  return (
    <SafeAreaView style={{...styles.container, backgroundColor: theme.colors.background}}>
      <View style={{...styles.option, backgroundColor: theme.colors.background}}>
        <Text style={{...styles.optionText, color: theme.colors.onBackground}}>Dark Mode</Text>
        <Switch
          value={active}
          onValueChange={handleDarkModeToggle}
          thumbColor="#ffffff"
          trackColor={{ false: '#d3d3d3', true: '#81b0ff' }}
          theme={theme}
        />
      </View>
      <View style={{...styles.option, backgroundColor: theme.colors.background}}>
        <Text style={{...styles.optionText, color: theme.colors.onBackground}}>Language</Text>
        <Picker
          selectedValue={selectedLanguage}
          style={{...styles.picker, color: theme.colors.onBackground}}
          onValueChange={handleLanguageChange}
        >
          <Picker.Item label="English" value="en" />
          {/* <Picker.Item label="Espanol" value="es" /> */}
          {/* <Picker.Item label="Francais" value="fr" /> */}
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