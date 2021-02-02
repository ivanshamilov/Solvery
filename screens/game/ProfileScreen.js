import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";


import ProgressCircle from 'react-native-progress-circle';
import Dimensions from "../../constants/Dimensions";
import Colors from "../../constants/Colors";
import Avatar from "../../components/UI/Avatar";


const RANKS = {
    'Fellow Pupil': [0, 20],
    'Advanced Beginner': [21, 40],
    'Intermediate Mathematician': [41, 60],
    'Almost Pythagoras': [61, 80],
    'Math God': [81, 100]
}

const ProfileScreen = props => {
    const userState = useSelector(state => state.auth);
    const fetchedLevels = useSelector(state => state.levels.userLevels);
    const [userProgress, setUserProgress] = useState(0);
    const [rank, setRank] = useState('');

    useEffect(() => {
        let total_progress = 0, level_tasks = 0;

        for (const level_progress of userState.user.user_progress)
            total_progress += level_progress.qty_completed_tasks;

        for (const level_data of fetchedLevels)
            level_tasks += level_data.tasks.length;

        let pr = Math.round(total_progress * 100 / level_tasks);
        setUserProgress(pr);

        for (const [key, value] of Object.entries(RANKS))
        {
            if (+pr >= value[0] && +pr <= value[1])
                setRank(key)
        }


    }, [fetchedLevels]);



    return (
        <LinearGradient style={styles.gradient} colors={["#CED0F2", "#F2BFAC"]}>
            <View style={styles.container}>
                <View style={styles.profileImgContainer}>
                    <Avatar large src={userState.user.user_photo ? `data:image/png;base64${userState.user.user_photo}` : require('../../assets/images/person.png')} />
                </View>
                <View style={styles.dataContainer}>
                    <View style={styles.personalInfoContainer}>
                        <Text style={styles.dataText}>{userState.user.name} {userState.user.surname} ({userState.user.username})</Text>
                        <Text style={{ fontFamily: 'sf-pro-display' }}>currently you are</Text>
                    </View>
                    <View style={styles.rankContainer}>
                        <Text style={styles.rank}>{rank}</Text>
                        <Text style={styles.quote}>{rank === "Math God" ? 'Good Job!' : 'Keep going!'}</Text>
                    </View>
                </View>
                <View style={styles.progressContainer}>
                    <ProgressCircle
                        bgColor={Colors.additionalColor}
                        borderWidth={15}
                        color={"#FFFFFF"}
                        shadowColor={Colors.primaryColor}
                        radius={Dimensions.windowWidth / 2.5}
                        percent={userProgress}>
                        <Text style={{ fontFamily: 'sf-pro-display-bold', fontSize: 50, color: 'white' }}>
                            {userProgress}%
                        </Text>
                    </ProgressCircle>
                </View>
            </View>
        </LinearGradient>
    )
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImgContainer: {
        justifyContent: 'flex-end',
        flex: 3,
        marginLeft: 8,
        marginTop: Dimensions.windowHeight / 15,
        height: Dimensions.windowWidth / 3,
        width: Dimensions.windowWidth / 3,
        borderRadius: Dimensions.windowWidth / 1.5,
    },
    rankContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    personalInfoContainer: {
      alignItems: 'center'
    },
    dataText: {
        fontFamily: 'sf-pro-display-bold',
        fontSize: 20
    },
    rank: {
      fontFamily: 'sf-pro-display-bold',
      color: Colors.additionalColor,
      fontSize: 35
    },
    quote: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'sf-pro-display-bold'
    },
    dataContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Dimensions.windowHeight / 25,
        paddingBottom: Dimensions.windowHeight / 25,
        flex: 3
    },
    progressContainer: {
        borderWidth: 45,
        borderColor: Colors.additionalColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.windowWidth / 1.2 + 40,
        height: Dimensions.windowWidth / 1.2 + 40,
        borderRadius: Dimensions.windowWidth / 1.2 / 2 + 40 ,
        marginBottom: Dimensions.windowWidth / 15
        // flex: 8,
    }
});

export default ProfileScreen;
