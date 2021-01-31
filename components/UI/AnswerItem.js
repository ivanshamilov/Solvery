import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Button
} from "react-native";

import Dimensions from '../../constants/Dimensions';
import Card from "./Card";
import Colors from "../../constants/Colors";



const AnswerItem = props => {
    const { id, option, onChange, chosenAnswer, isFinished } = props;
    const [chosen, setChosen] = useState(false);
    const [finished, setFinished] = useState({
        correct: false,
        incorrect: false
    })
    const chooseAnswer = useCallback(() => {
        setChosen(!chosen);
        onChange(id, !chosen);
    }, [id, onChange, chosen, setChosen]);

    useEffect(() => {
        if (chosenAnswer !== id)
        {
            setChosen(false);
        }
    }, [chosenAnswer]);

    useEffect(() => {
        setFinished({
            correct: isFinished.correct_answer === option,
            incorrect: isFinished.correct_answer !== option && chosen
        })
        setChosen(false);
    }, [isFinished]);

    return (
        <TouchableOpacity activeOpacity={0.9} disabled={isFinished.finished} onPress={chooseAnswer}>
            <Card style={[styles.container, chosen ? styles.chosen : '', finished.correct ? styles.correct_option : '', finished.incorrect ? styles.incorrect_option : '']}>
                <Text style={[styles.text, chosen ? styles.chosen : '']}>{option}</Text>
            </Card>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.windowWidth / 1.3,
        padding: 15,
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: 'white',
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    chosen: {
        backgroundColor: Colors.additionalColor,
        borderColor: Colors.additionalColor,
    },
    text: {
        fontFamily: 'sf-pro-display-semibold',
        fontSize: 17
    },
    chosenText: {
        color: 'white'
    },
    correct_option: {
        borderColor: 'green'
    },
    incorrect_option: {
        borderColor: 'red'
    }
})

export default AnswerItem;