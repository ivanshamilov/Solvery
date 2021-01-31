import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    ImageBackground,
    ScrollView, Platform
} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import Dimensions from '../../constants/Dimensions';
import { showMessage } from "react-native-flash-message";
import { Ionicons } from "@expo/vector-icons";


import TaskItem from "../../components/Items/TaskItem";
import ProgressBar from "../../components/UI/ProgressBar";
import FlashCustomContent from "../../components/Items/FlashCustomContent";


const LevelScreen = props => {
    const { navigation } = props;
    const [currentTask, setCurrentTask] = useState(1);
    const scrollRef = useRef();
    const [currentProgress, setCurrentProgress] = useState(0);

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
                return <FlashCustomContent progress={currentProgress * 100/tasks.length}/>
            },
            message: '',
            duration: 2000
        })
        setTimeout(goToMenu, 2000);
    }


    const tasks = navigation.getParam('tasks');
    return (
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
                            <TaskItem current_task={currentTask} onLevelEnding={levelEndingHandler} curr_progress={currentProgress} onUpdateProgress={updateProgressHandler} task_qty={tasks.length} task={task} onChangeTask={changeTaskHandler} />
                        )
                    })
                }
            </ScrollView>
        </View>
        </LinearGradient>
    )
};

LevelScreen.navigationOptions = {

}

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
