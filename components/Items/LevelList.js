import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';

import LevelItem from './LevelItem';


const LevelList = props => {
    const { data, navigation } = props;
    const selectLevelHandler = async (level) => {
        navigation.push('Level', {
            tasks: level.tasks,
            userState: props.userState
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
        paddingBottom: 50,
        flex: 1,
      },
});

export default LevelList;