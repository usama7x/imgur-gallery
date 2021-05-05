import {ActionTypes} from './actions';
import Immutable from 'immutable';

export const initialState = Immutable.fromJS({});

const setGallery = (state, {gallery}) => {
    return state.merge({gallery});
};

export const callbacks = [
    {
        actionType: ActionTypes.SET_GALLERY,
        actionFunction: setGallery,
    }
]