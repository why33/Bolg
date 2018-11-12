import { combineReducers } from 'redux';
import index from './index/Reducer';
import music from './music/Reducer';

const reduces={
    index,
    music
}
export default combineReducers(reduces)