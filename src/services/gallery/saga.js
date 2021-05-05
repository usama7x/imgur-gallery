import { call, put, takeLatest, all } from 'redux-saga/effects';
import Actions, { ActionTypes } from './actions';
import api from '../../utils/imgurApi';
import { oneLineTrim } from 'common-tags';


function* fetchGallery({ galleryParams }) {
    try {
        const {data} = yield call(api.get, {
          route: oneLineTrim`https://api.imgur.com/3/gallery
                 /${galleryParams.section}
                 /${galleryParams.sort}
                 /${galleryParams.window}`,
          params: {showViral: galleryParams.showViral}
        })
        const gallery = data;
        yield put(Actions.setGallery({ gallery }));
    } catch (error) {
        console.log(error);
    }
};

export default function* rootSaga() {
    yield all([takeLatest(ActionTypes.FETCH_GALLERY, fetchGallery)]);
}
