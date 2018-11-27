import { combineReducers } from 'redux';
import index from './index/Reducer';
import music from './music/Reducer';
import article from './article/Reducer';

const reduces={
    index,
    music,
    article
}
export default combineReducers(reduces);