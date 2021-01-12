import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  AsyncStorage,
  FlatList,
  Dimensions,
  Image,
  Animated,
  Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import * as levelsActions from '../../store/actions/levels';

import random_data from '../../data/random-data';
import LevelList from '../../components/Items/LevelList';
import MainMenuHeader from '../../components/Items/MainMenuHeader';
import StartButton from '../../components/UI/StartButton';
import Colors from '../../constants/Colors';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HEADER_MAX_HEIGHT = windowHeight / 4 + 20;

const MainMenuScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const userLevels = useSelector(state => state.levels.userLevels);

  const dispatch = useDispatch();

  const userName = useSelector(state => state.auth.userName);

  // const loadLevels = useCallback(async () => {
  //   try {
  //     await dispatch(levelsActions.fetchLevels());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [dispatch, setIsLoading]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   loadLevels()
  //     .then(() => setIsLoading(false));
  // }, []);


  if (isLoading) 
  {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    )
  }

  return (
    <LinearGradient style={styles.gradient} colors={["#CED0F2", "#F2BFAC"]}>
      <View style={styles.screen}>
            <LevelList
              scrollViewContent={styles.scrollViewContent}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}]
              )}
              data={userLevels} />
           <MainMenuHeader levels={userLevels} scrollY={scrollY}/>
      </View>
     </LinearGradient>
  );
};

MainMenuScreen.navigationOptions = (navData) => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
  screen : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT
  },
  
});

export default MainMenuScreen;
