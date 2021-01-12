import React from 'react';
import {
    View, 
    Button,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';


import Colors from '../../constants/Colors';
import LoadingSpinner from './LoadingSpinner_v1';

const CustomButton = props => {
    return (
        <TouchableOpacity onPress={props.onSubmit} {...props} >
            <View style={[ styles.buttonContainer, props.disabled && styles.disabled ]}>
            {props.isLoading ? <ActivityIndicator color='white' /> : <Ionicons name='ios-chevron-forward' style={{ paddingLeft: 3, fontSize: 35, color: 'white' }} size={35}/>}
            </View>
        </TouchableOpacity>

    )
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 30,
        backgroundColor: Colors.accentColor,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60
    },
    disabled: {
        borderRadius: 30,
        backgroundColor: 'rgba(242, 191, 172, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60
    }
});

export default CustomButton;