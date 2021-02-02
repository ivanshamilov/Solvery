import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import Card from '../UI/Card';
import ProgressBar from '../UI/ProgressBar';
import { useSelector } from 'react-redux';
import LoadingSpinner from "../UI/LoadingSpinner_v1";

import Dimensions from "../../constants/Dimensions";
import Colors from '../../constants/Colors'


const mapLevels = user_progress => {
    let levels = {};
    for (const level of user_progress)
    {
        levels[level.level_id] = level.qty_completed_tasks;
    }
    return levels;
}

const LevelItem = props => {

    const { itemData, onLevelSelect } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState('');
    const user = useSelector(state => state.auth.user);

    const loadImage = async () => {
        const imageStr = 'data:image/png;base64,' + itemData.item.level_icon
        setImage(imageStr);
    }

    const user_progress = mapLevels(user.user_progress);


    useEffect(() => {
        setIsLoading(true);
        loadImage()
            .then(() => setIsLoading(false))
            .catch(err => console.log(err));
    }, []);

    let progress;

    if (itemData.item.tasks.length === 0)
    {
        progress = (
            <View style={styles.completedContainer}>
                <Text style={styles.completed}>Coming Soon!</Text>
            </View>
        )
    } else if (user_progress[itemData.item._id] === itemData.item.tasks.length)
    {
        progress = (
            <View style={styles.completedContainer}>
                <Text style={styles.completed}>Completed!</Text>
            </View>
        )
    } else {
        progress = (
            <View style={styles.progressContainer}>
                <Text style={styles.progressBarText}>{user_progress[itemData.item._id]} out of {itemData.item.tasks.length}</Text>
                <ProgressBar step={user_progress[itemData.item._id]} steps={itemData.item.tasks.length} height={10} fill="#CED0F2" bgColor="#4E3473" />
            </View>
        )
    }

    return (
      <TouchableOpacity disabled={itemData.item.tasks.length === 0} activeOpacity={0.8} onPress={onLevelSelect}>
        <Card style={[styles.levelContainer, itemData.item.tasks.length === 0 ? styles.blocked : '']}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{ itemData.item.tasks.length === 0 ? "Currently unavailable" : itemData.item.title}</Text>
        </View>
        <View style={styles.imageContainer}>
            {
                isLoading
                ?
                    <LoadingSpinner />
                :
                    <Image source={{uri: image}} style={styles.image} />
            }
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
    width: Dimensions.windowWidth / 2 - 20,
    height: Dimensions.windowHeight / 4 + 20,
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
    width: Dimensions.windowWidth / 3 ,
    height: Dimensions.windowWidth / 3
  },
  blocked: {
      borderColor: Colors.accentColor,
  }
});

export default LevelItem;
