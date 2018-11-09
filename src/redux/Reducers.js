import { combineReducers } from 'redux';
import index from './index/Reducer'

const reduces={
    index,
}
export default combineReducers(reduces)