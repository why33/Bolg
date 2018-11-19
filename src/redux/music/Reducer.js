import Type from './Type';

const initialState={
    musicAll:[],
    selectedMusic:{},
    time:null
};
const getNewState=function(state=initialState,action){
    switch(action.type){
        case Type.LOAD_MUSIC:
            return {
                ...state,
                musicAll:[...state.musicAll,action.data]
            }
        case Type.SELECT_MUSIC:
            return {
                ...state,
                selectedMusic:action.data
            }
        case Type.GET_TIME:
            return {
                ...state,
                time:action.data
            }
        default:
            return state
    }
}
export default getNewState;