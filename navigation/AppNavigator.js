import React from 'react'; 
import { View, Text } from 'react-native';

import { createAppContainer,  } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';  

import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transition } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import StartupScreen from '../screens/StartupScreen.js';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import MainMenuScreen from '../screens/game/MainMenuScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import ProgressBar from '../components/UI/ProgressBar';


class TestScreen extends React.Component 
{
    render() 
    {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Test Screen</Text>
            </View>
        )
    }
}


const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: {
        headerShown: false,
    }
})

const GameNavigator = createMaterialBottomTabNavigator({
    Main: {
        screen: MainMenuScreen,
        navigationOptions: {
            tabBarLabel: 'Quizes',
            tabBarIcon: ({ tintColor }) => {
                    return (
                        <View>
                            <Ionicons style={{ color: tintColor }} size={25} name={ Platform.OS === 'android' ? 'md-color-filter' : 'ios-color-filter-outline'} />
                        </View>
                         )
             }
        }
    },
    Test: {
        screen: TestScreen,
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
    Notes: {
        screen: TestScreen,
        navigationOptions: {
            tabBarLabel: "Notes",
            tabBarIcon: ({ tintColor }) => {
                return (
                    <View>
                        <Ionicons style={{ color: tintColor }} size={25} name={ Platform.OS === 'android' ? 'md-bookmarks' : 'ios-bookmarks-outline'} />
                    </View>
                     )
         }
        }
    },
    Settings: {
        screen: TestScreen,
        navigationOptions: {
            tabBarLabel: "Settings",
            tabBarIcon: ({ tintColor }) => {
                return (
                    <View>
                        <Ionicons style={{ color: tintColor }} size={25} name={ Platform.OS === 'android' ? 'md-settings' : 'ios-settings-outline'} />
                    </View>
                     )
         }
        }
    }
},
{
    activeColor: '#7E669F',
    inactiveColor: 'rgba(128, 128, 128, 0.6)',
    barStyle: {
        height: 75,
        backgroundColor: '#FFFFFF'
    },
},
)


const MainNavigator = createAnimatedSwitchNavigator({
    Startup: StartupScreen,
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


// const MainNavigator = createStackNavigator({
//     Startup: StartupScreen,
//     Test: Test
//     // Game: GameNavigator 
// },{
//     defaultNavigationOptions: {
//         headerShown: false
//     }
// });



export default createAppContainer(MainNavigator);


////////////////////////////////////////////////////////////////



// const TabNavigator = createMaterialBottomTabNavigator(
//     {
//         Home: {
//             screen: HomeScreen,
//             navigationOptions: {
//                 tabBarLabel: 'Home',
//                 tabBarIcon: ({ tintColor }) => {
//                     return (
//                         <View>
//                             <Ionicons style={{ color: tintColor }} size={25} name="ios-home" />
//                         </View>
//                     )
//                 }
//             }
//         },
//         Profile: {
//             screen: ProfileScreen,
//             navigationOptions: {
//                 tabBarLabel: 'Profile',
//                 tabBarIcon: ({ tintColor }) => {
//                     return (
//                         <View>
//                             <Ionicons style={{ color: tintColor }} size={25} name="ios-person" />
//                         </View>
//                     )
//                 }
//             }
//         },
//         History: {
//             screen: HistoryScreen,
//             navigationOptions: {
//                 tabBarLabel: 'History',
//                 tabBarIcon: ({ tintColor }) => {
//                     return (
//                         <View>
//                             <Ionicons style={{ color: tintColor }} size={25} name="ios-images" />
//                         </View>
//                     )
//                 }
//             }

//         },
//         Cart: {
//             screen: CartScreen,
//             navigationOptions: {
//                 tabBarLabel: 'Cart',
//                 tabBarIcon: ({ tintColor }) => {
//                     return (
//                         <View>
//                             <Ionicons style={{ color: tintColor }} size={25} name="ios-cart" />
//                         </View>
//                     )
//                 }
//             }
//         },

//     },
//     {
//         initialRoute: 'Home',
//         activeColor: '#f0edf6',
//         inactiveColor: '#3e2465',
//         barStyle: {
//             backgroundColor: '#694fad'
//         }
//     }
// )

