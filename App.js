import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as Font from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import ReduxThunk from 'redux-thunk';
import { Asset } from 'expo-asset';

import AppNavigator from './navigation/AppNavigator';
import HorizontalScrollView from './components/UI/HorizontalScrollView';
import authReducer from './store/reducers/auth';
import levelsReducer from './store/reducers/levels';

const rootReducer = combineReducers({
  auth: authReducer,
  levels: levelsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const _fetchResourcesAsync = async () => {
  const fonts = await Font.loadAsync({
    'sf-pro-display': require('./assets/fonts/SFProDisplay.ttf'),
    'sf-pro-display-bold': require('./assets/fonts/SFProDisplay-bold.ttf'),
    'sf-pro-display-semibold': require('./assets/fonts/SFProDisplay-Semibold.ttf'),
    'sf-pro-display-heavy': require('./assets/fonts/SFProDisplay-Heavy.ttf'),
    'nunito-sans-light': require('./assets/fonts/NunitoSans-Light.ttf'),
    'nunito-sans-bold': require('./assets/fonts/NunitoSans-Bold.ttf'),
    'nunito-sans-extralight': require('./assets/fonts/NunitoSans-ExtraLight.ttf'),
  });
  const images = await Asset.loadAsync(require('./assets/images/Solvery.png'));
  return Promise.all({
    fonts: fonts,
    images: images
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    console.log("Font is not loaded");
    return (<AppLoading 
              startAsync={_fetchResourcesAsync}
              onError={() => console.log("Error")}
              onFinish={() => {
                setFontLoaded(true); 
                console.log("Font is loaded");
              }}
          />)
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

