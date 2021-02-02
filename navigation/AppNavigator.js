import React from 'react'; 
import { View } from 'react-native';

import { createAppContainer,  } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transition } from 'react-native-reanimated';


import StartupScreen from '../screens/StartupScreen.js';
import MainMenuScreen from '../screens/game/MainMenuScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import LevelScreen from '../screens/game/LevelScreen';
import ProfileScreen from "../screens/game/ProfileScreen";




const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: {
        headerShown: false,
    },
})

const MainMenuNavigator = createStackNavigator({
        Main: MainMenuScreen,
        Level: {
            screen: LevelScreen,
            navigationOptions: {
                gestureEnabled: false
            }
        },
    },
    {
        defaultNavigationOptions: {
            headerShown: false,
        }
    })

MainMenuNavigator.navigationOptions = ({ navigation }) => {
    let routeName = navigation.state.routes[navigation.state.index].routeName

    let tabBarVisible;

    if ( routeName === 'Level' ) {
        tabBarVisible = false
    }

    return {
        tabBarVisible
    };
}

const GameNavigator = createMaterialBottomTabNavigator({
    Main: {
        screen: MainMenuNavigator,
        navigationOptions: {
            tabBarLabel: 'Quizzes',
            tabBarIcon: ({ tintColor }) => {
                    return (
                        <View>
                            <Ionicons style={{ color: tintColor }} size={25} name={ Platform.OS === 'android' ? 'md-color-filter' : 'ios-color-filter-outline'} />
                        </View>
                         )
             },
        }
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarLabel: "Profile",
            tabBarIcon: ({ tintColor }) => {
                return (
                    <View>
                        <Ionicons style={{ color: tintColor }} size={23} name={Platform.OS === 'android' ? 'md-person' : 'ios-person-outline'} />
                    </View>
                     )
         }
        }
    },
},
    {
        shifting: true,
    activeColor: '#7E669F',
    inactiveColor: 'rgba(128, 128, 128, 0.6)',
    barStyle: {
        height: 75,
        backgroundColor: '#FFFFFF',
        // backgroundColor: 'red'
    },
},
)


const MainNavigator = createAnimatedSwitchNavigator({
        Startup: StartupScreen,
        Auth: AuthNavigator,
        Game: GameNavigator,
    // Auth: AuthNavigator,
},
{
    transition: (
            <Transition.Together>
              <Transition.Out
                type="slide-bottom"
                durationMs={400}
                interpolation="easeIn"
              />
              <Transition.In type="fade" durationMs={500} />
            </Transition.Together>
          )
},
 {
    defaultNavigationOptions: {
        headerShown: false
    }
});




export default createAppContainer(MainNavigator);
