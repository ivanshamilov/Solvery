import React, { useRef, useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform
} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import Dimensions from '../../constants/Dimensions';
import { showMessage } from "react-native-flash-message";
import { Ionicons } from "@expo/vector-icons";
import {useDispatch} from "react-redux";


import * as authActions from '../../store/actions/auth';
import * as levelActions from '../../store/actions/levels';


import TaskItem from "../../components/Items/TaskItem";
import ProgressBar from "../../components/UI/ProgressBar";
import FlashCustomContent from "../../components/Items/FlashCustomContent";
import LoadingSpinner from "../../components/UI/LoadingSpinner_v1";


const LevelScreen = props => {
    const { navigation } = props;
    const [currentTask, setCurrentTask] = useState(1);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const scrollRef = useRef();

    const tasks = navigation.getParam('tasks');
    const userState = navigation.getParam('userState');


    const goToMenu = () => {
        navigation.navigate('Main');
    }

    const changeTaskHandler = () => {
        scrollRef.current?.scrollTo({
            x: currentTask * Dimensions.windowWidth,
            animated: true
        })
        setCurrentTask(prevState => ++prevState);
        if (currentTask === tasks.length)
            levelEndingHandler();
    };

    const updateProgressHandler = () => {
        setCurrentProgress(currentProgress + 1);
    }

    const updateDBProgress = useCallback(async (currentProgress) => {
        console.log(userState.user._id, tasks[0].level, currentProgress, userState.token);
        try {
            await dispatch(authActions.update_user_progress(userState.user._id, tasks[0].level, currentProgress, userState.token))
            await dispatch(levelActions.fetchLevels());
        } catch (err) {
            console.log(err);
        }
    }, [dispatch]);


    const levelEndingHandler = () => {
        showMessage({
            position: 'center',
            type: 'info',
            style: {
                width: 200,
                height: 100,
                borderRadius: 20
            },
            renderCustomContent: () => {
                return <FlashCustomContent progress={Math.round(currentProgress * 100/tasks.length)}/>
            },
            message: '',
            duration: 2000
        });
        setIsLoading(true);
        updateDBProgress(currentProgress)
            .then(() => {
                setIsLoading(false)
                goToMenu()
            });
    }



    return (
        <>
            {isLoading ? <LoadingSpinner /> : null}
            <LinearGradient style={styles.gradient} colors={["#CED0F2", "#F2BFAC"]}>
                <View style={styles.screen}>
                    <View style={styles.progressBarContainer}>
                        <TouchableOpacity activeOpacity={0.9} onPress={goToMenu}>
                            <Ionicons size={35} style={{ color: 'white' }} name={Platform.OS === 'android' ? 'md-close' : 'ios-close-outline'}/>
                        </TouchableOpacity>
                        <View style={{ width: '100%', paddingTop: 15, marginLeft: 15 }}>
                            <ProgressBar step={currentProgress} steps={tasks.length} height={7} fill="#4E3473" bgColor="#FFFFFF" />
                        </View>
                    </View>
                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        ref={scrollRef}
                    >
                        {
                            tasks.map(task => {
                                return (
                                    <TaskItem key={task._id} current_task={currentTask} onLevelEnding={levelEndingHandler} curr_progress={currentProgress} onUpdateProgress={updateProgressHandler} task_qty={tasks.length} task={task} onChangeTask={changeTaskHandler} />
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </LinearGradient>
        </>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressBarContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: Dimensions.windowHeight / 10,
        flex: 1,
        width: Dimensions.windowWidth - 20,
        paddingHorizontal: Dimensions.windowWidth / 10
    },
    gradient: {
        flex: 1
    },
    container: {
        flex: 1,
        width: Dimensions.windowWidth,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LevelScreen;
