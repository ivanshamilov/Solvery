export const SET_LEVELS = 'SET_LEVELS';
export const UPDATE_LEVEL = 'UPDATE_LEVEL';


export const fetchLevels = () => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch('https://application-pwr.herokuapp.com/level/get_levels');
            if (!response.ok) {
                throw Error('Something went wrong');
            }
            const resData = await response.json();

            const loadedLevels = resData.levels;

            dispatch({
                type: SET_LEVELS,
                userLevels: loadedLevels
            })
        } catch (err) {
            console.log(err);
        }

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