import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Button,
  AsyncStorage,
  FlatList,
  Dimensions,
  Image
} from 'react-native';
import { useDispatch } from 'react-redux';


import LevelItem from './LevelItem';
import * as levelsActions from '../../store/actions/levels';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LevelList = props => { 

    const { data } = props;

    const dispatch = useDispatch();

    const selectLevelHandler = async (levelId) => {
        try {
            await dispatch(levelsActions.updateLevel(levelId))
        } catch (err) {
            console.log(err);
        }
    };

    const renderItem = (itemData) => {
        return (
            <LevelItem onLevelSelect={selectLevelHandler.bind(this, itemData.item.id)}  itemData={itemData} />
          )
      };

    return (
        <FlatList 
            scrollEventThrottle={10}
            onScroll={props.onScroll}
            ListHeaderComponent={() => <View style={[props.scrollViewContent]}></View>}
            showsVerticalScrollIndicator={false}
            style={[props.style, styles.levelList]}
            data={data}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={item => item.id }
        />
    )
};

const styles = StyleSheet.create({
    levelList: {
        // marginTop: 200,
        paddingBottom: 50,
        // paddingTop:    200,
        // paddingBottom: 500,
        flex: 1,
      },
});

export default LevelList;