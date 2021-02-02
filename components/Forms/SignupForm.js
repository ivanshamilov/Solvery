import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as authActions from '../../store/actions/auth';
import Dimensions from "../../constants/Dimensions";

import Input from '../UI/Input';
import CustomButton from '../UI/Button';
import Colors from '../../constants/Colors';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';


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


const SignupForm = props => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const dispatch = useDispatch();
    
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            fullname: '',
            username: '',
            password: '',
        },
        inputValidities: {
            email: false,
            fullname: false,
            username: false,
            password: false,
        },
        formIsValid: false ,
    });

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState]);

    const submitFormHandler = async () => {
         // email, username, name, surname, password
        setIsLoading(true);
        try {
            await dispatch(authActions.signup(
                formState.inputValues.email, 
                formState.inputValues.username,
                formState.inputValues.fullname.split(' ')[0], 
                formState.inputValues.fullname.split(' ')[1],
                formState.inputValues.password, 
            ));
            setIsLoading(false);
            props.onLoggedIn();
        } catch (err) {
            console.log(err);
            setError(err.message);
            setIsLoading(false)
        }
     
    }


    useEffect(() => {
        if (error) {
            Alert.alert('Login Failed.', 'Invalid Credentials. Check and try again', [{ text: 'Ok' }])
        }
    }, [error]);


    return (
        <KeyboardAvoidingView behavior="position" style={{alignItems: 'center', paddingTop: 10, marginVertical: 30}}>
            <View style={styles.screen}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Create Account</Text>
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
                            label='Full Name'
                            id='fullname'
                            onInputChange={inputChangeHandler} 
                            keyboardType="default"
                            required
                            errorText="Please enter your full name"
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                        <Input 
                            label='Username'
                            id='username'
                            onInputChange={inputChangeHandler} 
                            errorText="Please enter a valid username."
                            keyboardType="default"
                            textContentType='none'
                            returnKeyType="next"
                            autoCorrect={false}
                            required
                            minLength={4}
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
                            blurOnSubmit={false}
                        />
                </View>
                 <View style={styles.actions}>
                     <View style={styles.buttonContainer}>
                            <Text style={{ fontFamily: 'sf-pro-display', fontSize: 30}}>Sign Up</Text>
                            <CustomButton isLoading={ isLoading } onSubmit={submitFormHandler} />
                    </View>
                    <View style={styles.changeMode}>
                        <Text style={{ fontSize: 15, fontFamily: 'nunito-sans-light' }}>Already a member? </Text>
                        <TouchableOpacity onPress={props.changeMode}><Text style={{ fontSize: 15, fontFamily: 'nunito-sans-light', color: Colors.primaryColor }}>Sign In instead.</Text></TouchableOpacity>
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
        paddingTop: 30,
        width: 300,
        flex: 3,
    },
    formControl: {
        paddingTop: 120,
        width: Dimensions.windowWidth / 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 5,
    },
    actions: {
        flex: 3,
        justifyContent: 'space-around'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 300,
    },
    changeMode: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        fontFamily: 'nunito-sans-light',
        fontSize: 11
    }
});

export default SignupForm;