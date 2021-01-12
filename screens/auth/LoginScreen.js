import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Text,
  ImageBackground
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formState = (state, action) => {
    switch (action.type) {

    }
    return state;
}

const LoginScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    
    const [formState, dispatchFormState] = useReducer(formState, {
        inputValues: {},
        inputValidities: {},
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred', [{text: 'Ok'}]);
        }
    }, [error])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        console.log('оп, инпут чендж')
    }, [dispatchFormState]);

    return (
        <View style={styles.screen}>
            
                <View>
                <Text>Login Screen</Text>
                <Button title="Go to signup" onPress={() => {
                    props.navigation.navigate('Signup');
                }} />
                </View>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default LoginScreen;