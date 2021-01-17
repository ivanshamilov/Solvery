import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated
} from 'react-native';


const StartButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('Pressed')}>
            <Animated.View style={[props.style, styles.button]}>
                <Text style={{ color: 'white', fontFamily: 'sf-pro-display-semibold', fontSize: 15 }}>{props.title}</Text>
            </Animated.View> 
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        width: 120,
        height: 40,
        backgroundColor: '#4E3473',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
});

export default StartButton;