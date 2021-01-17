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
  Image,
  TouchableOpacity
} from 'react-native';

import Colors from '../../constants/Colors';
import Card from '../UI/Card';
import ProgressBar from '../UI/ProgressBar';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LevelItem = props => {

    const { itemData, onLevelSelect } = props;
    

    const progress = itemData.item.done >= itemData.item.total ? (
      <View style={styles.completedContainer}>
        <Text style={styles.completed}>Completed</Text>
      </View>
    ) 
    :
    (
      <View style={styles.progressContainer}>
        <Text style={styles.progressBarText}>{itemData.item.done} out of {itemData.item.total}</Text>
        <ProgressBar step={itemData.item.done} steps={itemData.item.total} height={10} fill="#CED0F2" bgColor="#4E3473" />
      </View>
    )
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onLevelSelect}>
    
        <Card style={[styles.levelContainer, props.blocked ? styles.blocked : '' ]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{itemData.item.title}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{uri: `data:image/png;base64,${itemData.item.level_icon}`}} style={styles.image} />
        </View>
        <View>
          {progress}
        </View>
      </Card>
    </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
  levelContainer: {
    padding: 15,
    marginVertical: 15,
    marginHorizontal: 5,
    width: windowWidth / 2 - 20,
    height: windowHeight / 4 + 20,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#7E669F',
    justifyContent: 'space-between'
  },
  completedContainer: { 
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  completed: {
    fontFamily: 'sf-pro-display-heavy', 
    fontSize: 20,
    paddingVertical: 5, 
    letterSpacing: 0.5, 
    color: 'white' 
  },
  progressBarText: { 
    paddingBottom: 5, 
    fontFamily: 'sf-pro-display-heavy', 
    fontSize: 15, 
    color: 'white' 
  },
  progressContainer: { 
    // paddingBottom: 5
  },
  titleContainer: {
    alignItems: 'center'
  },
  title: {
    fontFamily: 'sf-pro-display-heavy', 
    color: 'white', 
    fontSize: 17, 
    letterSpacing: 1,
    textAlign: 'center'
  },
  imageContainer: {
    alignItems: 'center', 
    justifyContent: 'center'
  },
  image: {
    width: windowWidth / 3  , 
    height: windowWidth / 3 
  },
  blocked: {
    backgroundColor: "#eee"
  }
});

export default LevelItem;
