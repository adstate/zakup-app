import {GET_TOKEN, SET_TOKEN} from './actions';
import {REHYDRATE} from 'redux-persist';

const initialState = {
    token: null,
    name: null
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }

        case REHYDRATE:
            return {
                ...state,
            }

        default:
            return state;
    }
}
