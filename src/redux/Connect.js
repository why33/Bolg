import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import index from './index/Action';
import music from './music/Action';

const actions={
    index,
    music
}
const reduceObjects = objArr => objArr.reduce((a, b) => ({
    ...a,
    ...b,
  }), {})
export default (...keys)=>connect(
    state => reduceObjects(keys.map(key => state[key])),
    dispatch => reduceObjects(keys.map(key => bindActionCreators(actions[key], dispatch)))
)