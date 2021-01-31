import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from "react-native";


const FlashCustomContent = props => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Completed!
                </Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.content}>
                    Your accuracy was: {props.progress}%
                </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 150,
    },
    titleContainer: {
        alignItems: 'flex-start',
        width: 200
    },
    title: {
        fontSize: 25,
        fontFamily: 'sf-pro-display-bold',
        color: 'white'
    },
    contentContainer: {
        width: 200,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    content: {
        fontFamily: 'sf-pro-display-semibold',
        fontSize: 18,
        color: 'white'
    }
});

export default FlashCustomContent;