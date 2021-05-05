import {all} from 'redux-saga/effects';

import gallerySaga from '../services/gallery/saga';


export default function* rootSaga() {
    yield all([
        gallerySaga()
    ])
}