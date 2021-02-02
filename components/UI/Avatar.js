import React from 'react';
import {
    View,
    StyleSheet,
    Image
} from "react-native";
import Dimensions from "../../constants/Dimensions";
import Colors from "../../constants/Colors";

const Avatar = props => {
    const styles_options = {
        small: {
            container: styles.profileImgContainer_small,
            image: styles.profileImg_small
        },
        medium: {
            container: styles.profileImgContainer_medium,
            image: styles.profileImg_medium
        },
        large: {
            container: styles.profileImgContainer_large,
            image: styles.profileImg_large
        },
    }

    let style;

    if (props.small)
        style = styles_options["small"];
    else if (props.medium)
        style = styles_options["medium"]
    else if (props.large)
        style = styles_options["large"]




    return (
        <View style={style.container}>
            <Image style={style.image} source={props.src} />
        </View>
    )
};

const styles = StyleSheet.create({
    profileImgContainer_large: {
        justifyContent: 'flex-end',
        flex: 4,
        marginTop: Dimensions.windowHeight / 15,
        height: Dimensions.windowWidth / 3,
        width: Dimensions.windowWidth / 3,
        borderRadius: Dimensions.windowWidth / 1.5,
    },
    profileImg_large: {
        height: Dimensions.windowWidth / 3,
        width: Dimensions.windowWidth / 3,
        borderRadius: Dimensions.windowWidth / 1.5,
        backgroundColor: Colors.additionalColor,
    },
    profileImgContainer_small: {
        justifyContent: 'flex-end',
        marginTop: Dimensions.windowHeight / 10,
        height: Dimensions.windowWidth / 10,
        width: Dimensions.windowWidth / 10,
        borderRadius: Dimensions.windowWidth / 5,
    },
    profileImg_small: {
        height: Dimensions.windowWidth / 10,
        width: Dimensions.windowWidth / 10,
        borderRadius: Dimensions.windowWidth / 5,
        backgroundColor: Colors.additionalColor,
    },
    profileImgContainer_medium: {
        justifyContent: 'flex-end',
        marginTop: Dimensions.windowHeight / 6,
        height: Dimensions.windowWidth / 6,
        width: Dimensions.windowWidth / 6,
        borderRadius: Dimensions.windowWidth / 3,
    },
    profileImg_medium: {
        height: Dimensions.windowWidth / 6,
        width: Dimensions.windowWidth / 6,
        borderRadius: Dimensions.windowWidth / 3,
        backgroundColor: Colors.additionalColor,
    },
});

export default Avatar;