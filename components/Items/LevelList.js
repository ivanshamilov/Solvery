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


import LevelItem from './LevelItem';
import * as levelsActions from '../../store/actions/levels';
const LevelList = props => { 

    const { data, navigation } = props;
    const selectLevelHandler = async (level) => {
        navigation.push('Level', {
            tasks: level.tasks
        })
    };

    const renderItem = (itemData) => {
        return (
            <LevelItem onLevelSelect={selectLevelHandler.bind(this, itemData.item)} itemData={itemData} />
          )
      };

    return (
        <FlatList 
            scrollEventThrottle={10}
            onScroll={props.onScroll}
            ListHeaderComponent={() => <View style={[props.scrollViewContent]}/>}
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