import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Button,
  AsyncStorage
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as levelsActions from '../store/actions/levels';
import Colors from '../constants/Colors';

const StartupScreen = props => {


  const dispatch = useDispatch();
  const goToAuth = () => {
    props.navigation.navigate('Game');
  }
  const loadLevels = useCallback(async () => {
    try {
      await dispatch(levelsActions.fetchLevels());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    loadLevels();
    setTimeout(goToAuth, 3000);
  }, []);

  return (
    <View style={styles.screen}>
        <View style={styles.imageContainer}>
            <Image 
                style={styles.image}
                source={require('../assets/images/StartupImage.png')}
            />
        </View>
        <ActivityIndicator color={Colors.primaryColor} />
        {/* <Button title="Fetch Files" onPress={() => {
            fetch("http://192.168.0.106:8888/files")
            .then(res => res.json())
            .then(response => console.log(response));
        }}/> */}
    </View>
  );
};

StartupScreen.navigationOptions = navData => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
      width: '100%',
      height: '20%',
  },
  image: {
    height: 150,
    width: '100%',
    transform: [{ scale: 0.7 }]
  }
});

export default StartupScreen;
