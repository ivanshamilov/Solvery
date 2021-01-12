import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Animated,
    StyleSheet,
    Dimensions
} from 'react-native';
import levels from '../../store/reducers/levels';

import StartButton from '../UI/StartButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HEADER_MAX_HEIGHT = windowHeight / 4 + 20;
const HEADER_MIN_HEIGHT = 120;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const MainMenuHeader = props => {
      const { scrollY, levels } = props;
      const displayedLevel = levels[0];

      useEffect(() => {
        console.log('Here');
        console.log(displayedLevel);
      }, []);

      const headerHeight = scrollY.interpolate({
          inputRange: [0, HEADER_SCROLL_DISTANCE],
          outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
          extrapolate: 'clamp',
        });
    
      const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0.5, 0.5, 0],
        extrapolate: 'clamp',
      });
    
      const textOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
      });
    
      const imageTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -50],
        extrapolate: 'clamp',
      });

      const textTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -70],
        extrapolate: 'clamp',
      });

      const buttonTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -110],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View style={[styles.header, {height: headerHeight}]}>
            <View style={styles.bar}>
                <Animated.Image style={{ zIndex: -2, position: 'absolute', top: -30, left: windowWidth / 4, transform: [{translateY: imageTranslate}], opacity: imageOpacity, height: windowHeight / 3, width: windowHeight / 3}} source={displayedLevel.level_icon}/>
                <View style={styles.textContainer}>
                    <Animated.Text style={{opacity: textOpacity, transform: [{translateY: imageTranslate}], fontFamily: 'sf-pro-display', fontSize: 17, color: 'white' }}>
                        Up Next
                    </Animated.Text>
                    <Animated.Text style={{ transform: [{translateY: textTranslate}], fontFamily: 'sf-pro-display-heavy', color: 'white', marginVertical: 10, fontSize: 27 }}>
                        {displayedLevel.title}
                    </Animated.Text>
                </View>
                <View style={styles.buttonContainer}>
                    <StartButton title="Start" style={{ transform: [{translateY: buttonTranslate}] }}/>
                </View>
            </View>
        </Animated.View>
      )
      
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#7E669F',
        overflow: 'hidden',
    },
    bar: {
        flexDirection: 'row',
        marginTop: 28,
        height: HEADER_MAX_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        // borderWidth: 1,
        justifyContent: 'center',
        padding: 20
    },
    buttonContainer: {
        flex: 1,
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 80,
        marginRight: 20
    }
});

export default MainMenuHeader;