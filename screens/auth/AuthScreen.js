import React, { useRef, useState } from 'react';

import {
    ScrollView,
    View ,
    ImageBackground,
    StyleSheet,
} from 'react-native';


import LoginForm from '../../components/Forms/LoginForm';
import SignupForm from '../../components/Forms/SignupForm';
import Dimensions from '../../constants/Dimensions';

const AuthScreen = props => {
    const [isLogin, setIsLogin] = useState(false);

    const scrollRef = useRef();

    const changeModeHandler = () => {
        const scrollControl = isLogin ? 0 : Dimensions.windowWidth
        scrollRef.current?.scrollTo({
            x: scrollControl,
            animated: true,
        });
        setIsLogin(prevState => !prevState);
    }

    const onLoggedInHandler = () => {
        props.navigation.navigate('Game')
    }

    return (
        <ImageBackground
            source={require('../../assets/images/Solvery.png')}
            onLoad={() => {
                console.log("Image is loaded");
            }}
            style={{ width: '100%', height: '100%' }}>
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                ref={scrollRef}
            >
                <View style={styles.container}>
                    <LoginForm changeMode={changeModeHandler} onLoggedIn={onLoggedInHandler} />
                </View>
                <View style={styles.container}>
                    <SignupForm changeMode={changeModeHandler} onLoggedIn={onLoggedInHandler}/>
                </View>
            </ScrollView>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
   container: {
       flex: 1,
       width: Dimensions.windowWidth,
       height: '100%',
       justifyContent: 'center',
       alignItems: 'center'
   }
});


export default AuthScreen;