import React, { useRef } from 'react';

import {
    AppRegistry,
    ScrollView,
    Text,
    View ,
    Dimensions,
    Button,
    TextInput
} from 'react-native';


import Input from './Input';
import LoginForm from '../Forms/LoginForm';
import SignupForm from '../Forms/SignupForm';

const HorizontalScrollView = props => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const scrollRef = useRef();

    const changeModeHandler = (isLogin) => {
        scrollRef.current?.scrollTo({
            x: screenWidth,
            animated: true,
        });
    }

    return (
        <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            ref={scrollRef}
        >
            <View style={{ flex: 1, width: '100%', height: '100%', width: screenWidth, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5f9ea0' }}>
                <SignupForm changeMode={changeModeHandler}/>
            </View>
            <View style={{ flex: 1, width: '100%', height: '100%', width: screenWidth, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5f9ea0' }}>
                <LoginForm />
                <Button title="Go to Signup" onPress={() => { 
                    scrollRef.current?.scrollTo({
                        x: 0,
                        animated: true,
                    });
                 }}/>
            </View>
        </ScrollView>
    )
};


export default HorizontalScrollView;