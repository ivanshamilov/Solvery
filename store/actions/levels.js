import DATA from '../../data/random-data';

export const SET_LEVELS = 'SET_LEVELS';
export const UPDATE_LEVEL = 'UPDATE_LEVEL';


export const fetchLevels = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: SET_LEVELS,
            userLevels: DATA
        })
    }
}


export const updateLevel = (levelId) => {
    return async (dispatch, getState) => {
        dispatch({
            type: UPDATE_LEVEL,
            levelId: levelId
        })
    }
}