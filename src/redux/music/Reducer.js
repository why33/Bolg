import Type from './Type';

const initialState={
    musicAll:[],
    selectedMusic:{},
    time:0,//播放时间
    lyricTimeCha:[],//歌词时间差
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
        case Type.GET_LYRIC_TIME_CHA:
            return {
                ...state,
                lyricTimeCha:action.data

            }
        default:
            return state
    }
}
export default getNewState;