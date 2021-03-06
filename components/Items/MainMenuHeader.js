import React, {useState} from 'react';
import {ActivityIndicator, Animated, StyleSheet, View} from 'react-native';

import StartButton from '../UI/StartButton';
import Dimensions from '../../constants/Dimensions';


const HEADER_MAX_HEIGHT = Dimensions.windowHeight / 4 + 20;
const HEADER_MIN_HEIGHT = Dimensions.windowHeight / 7;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const interpolators = {
    headerHeight: {
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    },
    imageOpacity: {
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0.5, 0.5, 0],
        extrapolate: 'clamp',
    },
    textOpacity: {
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
    },
    imageTranslate: {
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -(Dimensions.windowHeight / 12)],
        extrapolate: 'clamp',
    },
    textTranslate: {
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -(Dimensions.windowHeight / 12)],
        extrapolate: 'clamp',
    },
    buttonTranslate: {
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -(Dimensions.windowHeight / 7.5)],
        extrapolate: 'clamp',
    }
}

const interpolateHeader = scrollY => {
    return {
        headerHeight: scrollY.interpolate(interpolators.headerHeight),
        imageOpacity: scrollY.interpolate(interpolators.imageOpacity),
        textOpacity: scrollY.interpolate(interpolators.textOpacity),
        imageTranslate: scrollY.interpolate(interpolators.imageTranslate),
        textTranslate: scrollY.interpolate(interpolators.textTranslate),
        buttonTranslate: scrollY.interpolate(interpolators.buttonTranslate)
    }
};


const MainMenuHeader = props => {
        const { scrollY, navigation, level, userState } = props
        const { headerHeight, imageOpacity, textOpacity, imageTranslate, textTranslate, buttonTranslate } = interpolateHeader(scrollY);
        const [isLoading, setIsLoading] = useState(false);
        const { title, isValid } = level;


        const selectLevelHandler = level => {
            navigation.push('Level', {
                tasks: level.tasks,
                userState: userState
            })
        }


          return (
            <Animated.View style={[styles.header, {height: headerHeight}]}>
                <View style={styles.bar}>
                    <Animated.Image
                        style={{ zIndex: -2, position: 'absolute', top: -(Dimensions.windowHeight / 25), left: Dimensions.windowWidth / 4, transform: [{translateY: imageTranslate}], opacity: imageOpacity, height: Dimensions.windowHeight / 3, width: Dimensions.windowHeight / 3}}
                        source={{ uri: level.level_icon }}
                    />
                    <View style={styles.textContainer}>
                        <Animated.Text style={{opacity: textOpacity, transform: [{translateY: imageTranslate}], fontFamily: 'sf-pro-display', fontSize: 17, color: 'white' }}>
                            { !isValid ? '' : 'Up Next' }
                        </Animated.Text>
                        <Animated.Text style={{ transform: [{translateY: textTranslate}], fontFamily: 'sf-pro-display-heavy', color: 'white', marginVertical: 10, fontSize: 27 }}>
                            {isLoading ? <ActivityIndicator /> : title}
                        </Animated.Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <StartButton disabledHeader={!isValid} title={!isValid ? 'Great Job' : 'Start'} onPress={selectLevelHandler.bind(this, level)} style={{ transform: [{translateY: buttonTranslate}] }}/>
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
        marginTop: Dimensions.windowHeight / 30,
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
        marginBottom: Dimensions.windowHeight / 10,
        marginRight: Dimensions.windowWidth / 20
    }
});

export default MainMenuHeader;