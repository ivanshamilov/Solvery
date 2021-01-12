import React, { useRef, useState } from 'react';

import {
    AppRegistry,
    ScrollView,
    Text,
    View ,
    Dimensions,
    Button,
    TextInput,
    ImageBackground,
    ActivityIndicator
} from 'react-native';


import LoginForm from '../../components/Forms/LoginForm';
import SignupForm from '../../components/Forms/SignupForm';
import LoadingSpinner from '../../components/UI/LoadingSpinner_v1';

const AuthScreen = props => {
    const [isLogin, setIsLogin] = useState(false);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const scrollRef = useRef();

    const changeModeHandler = () => {
        const scrollControl = isLogin ? 0 : screenWidth
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
                <View style={{ flex: 1, width: '100%', height: '100%', width: screenWidth, justifyContent: 'center', alignItems: 'center'}}>
                    <LoginForm changeMode={changeModeHandler} onLoggedIn={onLoggedInHandler} />
                </View>
                <View style={{ flex: 1, width: '100%', height: '100%', width: screenWidth, justifyContent: 'center', alignItems: 'center'}}>
                    <SignupForm changeMode={changeModeHandler} onLoggedIn={onLoggedInHandler}/>
                </View>
            </ScrollView>
        </ImageBackground>
    )
};


export default AuthScreen;