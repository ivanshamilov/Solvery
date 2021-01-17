import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  AsyncStorage,
  FlatList,
  Image,
  Animated,
  Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import * as levelsActions from '../../store/actions/levels';

import LevelList from '../../components/Items/LevelList';
import MainMenuHeader from '../../components/Items/MainMenuHeader';
import Dimensions from '../../constants/Dimensions';
import Colors from '../../constants/Colors';



const HEADER_MAX_HEIGHT = Dimensions.windowHeight / 4 + 20;

const MainMenuScreen = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const userLevels = useSelector(state => state.levels.userLevels);
  const dispatch = useDispatch();

  const userName = useSelector(state => state.auth.userName);

  const loadLevels = useCallback(async () => {
    try {
      await dispatch(levelsActions.fetchLevels());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, setIsLoading]);

  useEffect(() => {
      setIsLoading(true);
      loadLevels()
          .then(() => setIsLoading(false))
          .catch(err => console.log(err));
  }, [dispatch, loadLevels]);




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
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                  {
                      useNativeDriver: false
                  }
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
