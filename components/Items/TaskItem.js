import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    View,
    Text,
    Button,
    ImageBackground,
    StyleSheet,
    Platform,
    TouchableOpacity
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { showMessage, hideMessage } from "react-native-flash-message";

import Dimensions from '../../constants/Dimensions';
import ProgressBar from "../UI/ProgressBar";
import AnswerItem from "../UI/AnswerItem";
import StartButton from "../UI/StartButton";
import Colors from "../../constants/Colors";




const TaskItem = props => {
    const { task, onChangeTask, onUpdateProgress, curr_progress, onLevelEnding, current_task, task_qty } = props;
    const { task_title, title, answer, answer_options } = task;
    const [chosenAnswer, setChosenAnswer] = useState(null);
    const [progress, setProgress] = useState(curr_progress);
    const buttonDisabled = !chosenAnswer;
    const answers = {
        option0: answer_options[0],
        option1: answer_options[1],
        option2: answer_options[2],
        option3: answer_options[3],
    }

    const [isFinished, setIsFinished] = useState({
        finished: false,
        correct_answer: null
    });

    const answerItemChange = useCallback((answer_id, answer_chosen) => {
        if (answer_chosen === true)
            setChosenAnswer(answer_id);
        else if (answer_chosen === false)
            setChosenAnswer(null);
    }, [setChosenAnswer]);


    const selectAnswerHandler = () => {
        if (answers[chosenAnswer] === answer) {
            showMessage({
                position: 'top',
                message: "Success!",
                icon: 'success',
                titleStyle: {
                    fontFamily: 'sf-pro-display-bold',
                    fontSize: 20,
                    paddingTop: 3
                },
                statusBarHeight: 60,
                duration: 400,
                type: "success",
            });
            setProgress(curr_progress + 1);
            onUpdateProgress();
        } else {
            showMessage({
                position: 'top',
                message: "Error!",
                icon: 'danger',
                titleStyle: {
                    fontFamily: 'sf-pro-display-bold',
                    fontSize: 20,
                    paddingTop: 3
                },
                style: {
                    color: 'red'
                },
                statusBarHeight: 60,
                duration: 400,
                type: "danger",
            });
        }
        setIsFinished({
            finished: true,
            correct_answer: answer
        });
    };



    let buttonTitle;
    if (current_task === task_qty && isFinished.finished)
        buttonTitle = 'Finish'
    else if (isFinished.finished)
        buttonTitle = 'Next'
    else
        buttonTitle = 'Submit'


    return (
            <View style={styles.screen}>
                <View style={styles.contentContainer}>
                    <Text style={styles.task}>
                        {task_title}
                    </Text>
                    <Text style={styles.taskTitle}>
                        {task.task}
                    </Text>
                    {answer_options.map((option, index) => <AnswerItem isFinished={isFinished} id={`option${index}`} chosenAnswer={chosenAnswer} onChange={answerItemChange} option={answer_options[index]} />)}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => {

                    }}>
                        <Text>Open my notes</Text>
                    </TouchableOpacity>
                    <StartButton
                        onPress={isFinished.finished ? onChangeTask : selectAnswerHandler}
                        disabled={buttonDisabled}
                        title={buttonTitle}
                        style={{ borderRadius: 10, backgroundColor: Colors.additionalColor }}/>
                </View>
            </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: Dimensions.windowWidth,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressBarContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: Dimensions.windowHeight / 10,
        flex: 1,
        width: Dimensions.windowWidth - 20,
        paddingHorizontal: Dimensions.windowWidth / 10
    },
    contentContainer: {
        alignItems: 'center',
        flex: 3
    },
    buttonContainer: {
        flex: 1,
        width: Dimensions.windowWidth - 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    task: {
        fontFamily: 'nunito-sans-light',
        color: 'white',
        fontSize: 20,
    },
    taskTitle: {
        fontFamily: 'nunito-sans-extrabold',
        fontSize: 40,
        color: 'white',
        marginBottom: 30
    }
});

export default TaskItem;