import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

import Input from '../UI/Input';
import CustomButton from '../UI/Button';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

import Dimensions from "../../constants/Dimensions";

const formReducer = (state, action) => {
    switch(action.type) {
        case FORM_INPUT_UPDATE:
            const updatedValues = {
                ...state.inputValues,
                [action.input]: action.value
            };
            const updatedValidities = {
                ...state.inputValidities,
                [action.input]: action.isValid
            }
            let updatedFormIsValid = true;
            for (const key in updatedValidities) {
                updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
            }
            return {
                ...state,
                inputValues: updatedValues,
                inputValidities: updatedValidities,
                formIsValid: updatedFormIsValid
            }
    }
    return state;
}


const LoginForm = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false ,
    });

    const dispatch = useDispatch();

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState]);

    useEffect(() => {
        if (error) {
            Alert.alert('Login Failed.', 'Invalid Credentials. Check and try again', [{ text: 'Ok' }])
        }
    }, [error]);

    const submitFormHandler = async () => {
        setIsLoading(true);
        try {
            await dispatch(authActions.login(formState.inputValues.email, formState.inputValues.password));
            setIsLoading(false);
            props.onLoggedIn();
        } catch (err) {
            console.log(err);
            setError(err.message);
            setIsLoading(false);
        }
    
    };

    return (
        <KeyboardAvoidingView behavior="position" style={{alignItems: 'center', paddingTop: 10, marginVertical: 30}}>
            <View style={styles.screen}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Welcome Back</Text>
                </View>
                <View style={styles.formControl}>
                        <Input 
                            label='E-mail' 
                            id='email'
                            onInputChange={inputChangeHandler}
                            errorText="Please enter a valid e-mail."
                            keyboardType="default"
                            required
                            autoCorrect={true}
                            email
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                        <Input 
                            id="password"
                            label="Password"
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLength={6}
                            autoCapitalize="none"
                            autoCorrect={false}
                            errorText="Please enter a valid password"
                            onInputChange={inputChangeHandler}
                        />
                </View>
                <View style={styles.actions}>
                     <View style={styles.buttonContainer}>
                            <Text style={{ fontFamily: 'sf-pro-display', fontSize: 30}}>Sign In</Text>
                            <CustomButton isLoading={ isLoading } disabled={ !formState.formIsValid } onSubmit={submitFormHandler}/>
                    </View>
                    <View style={styles.changeMode}>
                        <Text style={{ fontSize: 15, fontFamily: 'nunito-sans-light' }}>Don't have an account? </Text>
                        <TouchableOpacity onPress={props.changeMode}><Text style={{ fontSize: 15, fontFamily: 'nunito-sans-light', color: Colors.primaryColor }}>Sign Up instead.</Text></TouchableOpacity>
                    </View>
                    </View>
                </View>
        </KeyboardAvoidingView>
    )
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    titleText: {
        fontSize: 45,
        width: Dimensions.windowWidth / 2,
        fontFamily: 'sf-pro-display-semibold',
        color: 'white',
        letterSpacing: 0.8
    },
    title: {
        justifyContent: 'flex-end',
        paddingTop: 45,
        width: 300,
        flex: 3,
    },
    formControl: {
        paddingTop: 45,
        width: Dimensions.windowWidth / 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 7,
    },
    actions: {
        flex: 3,
        paddingTop: 20,
        justifyContent: 'space-around'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 300,
        paddingBottom: 40
    },
    changeMode: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        fontFamily: 'nunito-sans-light',
        fontSize: 11,
        paddingBottom: 15
    }
});
export default LoginForm;