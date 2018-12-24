import { combineReducers } from 'redux';
import index from './index/Reducer';
import music from './music/Reducer';
import article from './article/Reducer';
import code from './code/Reducer';

const reduces={
    index,
    music,
    article,
    code,
}
export default combineReducers(reduces);