import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const ProgressBar = (props) => {

    const { step, steps, height, fill, bgColor } = props;

    const animatedValue = useRef(new Animated.Value(-1000)).current;
    const reactive = useRef(new Animated.Value(-1000)).current;
    const [width, setWidth] = useState(0);

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 500,
            useNativeDriver: true
        }).start()
    }, []);

    useEffect(() => {
        reactive.setValue(-width + (width * step) / steps);
    }, [step, width]);

    return (
        <>
        <View 
        onLayout={e => setWidth(e.nativeEvent.layout.width)}
        style={
        {
            height: height,
            backgroundColor: bgColor,
            borderRadius: height,
            overflow: 'hidden'
        }}>
            <Animated.View style={{
                height: height,
                backgroundColor: fill,
                borderRadius: height,
                width: '100%',
                position: 'absolute',
                left: 0,
                top: 0,
                transform: [{
                    translateX: animatedValue
                }]
            }} />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    
});

export default ProgressBar;