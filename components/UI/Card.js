import React from 'react';
import {
    View, 
    Button,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';


const Card = props => {
    return (
    <View style={[ styles.cardItem, props.style ]}>
        {props.children}
    </View>
    )
};

const styles = StyleSheet.create({
    cardItem: {
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
    }
});

export default Card;