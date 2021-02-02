import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Animated, StyleSheet, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import * as levelsActions from '../../store/actions/levels';

import LevelList from '../../components/Items/LevelList';
import MainMenuHeader from '../../components/Items/MainMenuHeader';
import Dimensions from '../../constants/Dimensions';
import Colors from '../../constants/Colors';

const HEADER_MAX_HEIGHT = Dimensions.windowHeight / 4 + 20;

const MainMenuScreen = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const userState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const fetchedLevels = useSelector(state => state.levels.userLevels);
    const [displayedLevel, setDisplayedLevel] = useState({
        tasks: [],
        title: 'You are all done!',
        level_icon: '',
        isValid: false
    })

    const loadLevel = () => {
        let f1 = 0
        for (const l of fetchedLevels) {
            let flag = 0;
            for (const level of userState.user.user_progress)
            {
                if (!level.qty_completed_tasks && level.level_id.toString() === l._id.toString()) {
                    setDisplayedLevel({
                        tasks: l.tasks,
                        title: l.title,
                        level_icon: `data:image/png;base64,${l.level_icon}`,
                        isValid: true
                    })
                    flag = 1;
                    f1 = 1;
                }
            }
            if (flag)
                break;
        }
        if (f1 === 0)
        {
            setDisplayedLevel({
                tasks: [],
                title: 'You are all done!',
                level_icon: '',
                isValid: false
            })
        }
    }

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
          .then(() => {
              setIsLoading(false);
          })
          .catch(err => console.log(err))
  }, [dispatch, loadLevels]);

    useEffect(() => {
        loadLevel();
        console.log(displayedLevel);
        if (!displayedLevel.title)
        {
            console.log('hello');
            setDisplayedLevel({
                title: 'You are all done!',
                tasks: [],
                level_icon: '',
                isValid: false
            })
        }
    }, [fetchedLevels]);



    if (isLoading)
     {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
          </View>
        )
      } else {
        return (
            <LinearGradient style={styles.gradient} colors={["#CED0F2", "#F2BFAC"]}>
                <View style={styles.screen}>
                    <LevelList
                        userState={userState}
                        navigation={props.navigation}
                        scrollViewContent={styles.scrollViewContent}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {y: scrollY}}}],
                            {
                                useNativeDriver: false
                            }
                        )}
                        data={fetchedLevels} />
                    <MainMenuHeader
                        level={displayedLevel}
                        userState={userState}
                        navigation={props.navigation}
                        scrollY={scrollY}
                    />
                </View>
            </LinearGradient>
        );
    }
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
