import {combineReducers} from 'redux';
import {createReducer} from '../utils/reducer';
import appReducer from '../shared/redux/app/reducer';
// Gallery
import * as GalleryService from '../services/gallery/reducer'; 

export default combineReducers({
    appReducer, 
    services: combineReducers({
         gallery: createReducer(GalleryService) 
    })
});