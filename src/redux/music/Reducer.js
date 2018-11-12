import Type from './Type';

const initialState={
    musicAll:[],
    selectedMusic:{}
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
        default:
            return state
    }
}
export default getNewState;