import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated
} from 'react-native';
import Colors from "../../constants/Colors";


const StartButton = props => {
    const { disabled, disabledHeader } = props;


    return (
        <TouchableOpacity activeOpacity={0.7} disabled={disabled | disabledHeader} onPress={props.onPress}>
            <Animated.View style={[styles.button, props.style, disabled ? styles.disabled : '', disabledHeader ? styles.disabledHeader : '', props.correct ? styles.correct : '']}>
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
    },
    disabled: {
        backgroundColor: 'rgba(116, 87, 156, 0.4)'
    },
    disabledHeader: {
        backgroundColor: Colors.accentColor
    },
    correct: {
        backgroundColor: 'green'
    }
});

export default StartButton;