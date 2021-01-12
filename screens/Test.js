import React, { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Button,
  AsyncStorage
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import Colors from '../constants/Colors';

const Test = props => {
  return (
    <View style={styles.screen}>
        <Image 
        style={{ transform: [{scale: 0.5}] }}
        source={require('../assets/images/Solvery.png')}/>
    </View>
  );
};

Test.navigationOptions = (navData) => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
  screen : {
    position: 'relative',
    width: 375,
    height: 812,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Test;
