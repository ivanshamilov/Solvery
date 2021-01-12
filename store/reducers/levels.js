import { 
    SET_LEVELS,
    UPDATE_LEVEL
} from '../actions/levels';

const initialState = {
    userLevels: []
};

import Level from '../../models/LevelModel';

export default (state = initialState, action) => {
    switch(action.type) 
    {
        case SET_LEVELS:
            return {
                userLevels: action.userLevels
            }
        case UPDATE_LEVEL:
            const levelIndex = state.userLevels.findIndex(
                level => level.id === action.levelId
              );
              const updatedLevel = new Level(
                action.levelId,
                state.userLevels[levelIndex].points_for_level,
                state.userLevels[levelIndex].title,
                state.userLevels[levelIndex].level_type_id,
                state.userLevels[levelIndex].tasks,
                state.userLevels[levelIndex].level_icon,
                state.userLevels[levelIndex].done++,
                state.userLevels[levelIndex].total,
              );
              const updatedUserLevels = [...state.userLevels];
              updatedUserLevels[levelIndex] = updatedLevel;
              return {
                ...state,
                userLevels: updatedUserLevels
              }
        default:
            return initialState
    }
};

