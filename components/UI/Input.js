import React, { useReducer, useEffect, useState }  from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const INPUT_RESET = 'INPUT_RESET';

const inputReducer = (state, action) => {
    switch(action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
        case INPUT_RESET:
            return {
                value: '',
                isValid: false,
                touched: false
            }
        default:
            return state;
    }
};

const Input = props => {
    
  
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: '',
        isValid: false,
        touched: false        
    });


    const { onInputChange, id } = props;

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid);
        }
    }, [id, inputState, onInputChange]);


  
    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
                isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        dispatch({ 
            type: INPUT_CHANGE,
            value: text,
            isValid: isValid 
         })
    };

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR });
    };

    return (
        <View style={styles.formControl}>
                    <Text style={[styles.label,  !inputState.isValid && inputState.touched ? styles.errorLabel : '']}>{props.label}</Text>
                    <TextInput 
                        {...props}
                        style={[styles.input, !inputState.isValid && inputState.touched ? styles.inputError : '']} 
                        value={inputState.value} 
                        onChangeText={textChangeHandler}
                        onBlur={lostFocusHandler}
                    />
                    {!inputState.isValid && inputState.touched && <View style={styles.errorContainer}><Text style={{ fontFamily: 'nunito-sans-extralight', color: 'red', fontSize: 15 }}>{props.errorText}</Text></View>}
        </View>
    )
};

const styles = StyleSheet.create({
    formControl: {
        width: '100%',
        marginVertical: 5
    },
    label: {
        fontSize: 15,
        zIndex: -100,
        paddingHorizontal: 5,
        // position: 'absolute',
        fontFamily: 'nunito-sans-extralight'
    },
    input: {
        paddingHorizontal: 3,
        paddingVertical: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: 280,
        zIndex: 1,
        fontSize: 18,
        fontFamily: 'nunito-sans-light',
    },
    inputError: {
        borderBottomColor: 'red',
    },
    errorLabel: {
        color: 'red',
        fontFamily: 'nunito-sans-bold'
    }
});

export default Input;







