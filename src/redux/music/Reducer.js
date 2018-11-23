import Type from './Type';

const initialState={
    musicAll:[],
    selectedMusic:{},
    time:0,//播放时间
    lyricTimeCha:[],//歌词时间差
    isPlay:false,//是否播放,
    indexSelected:0,//选中歌曲的索引
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
                selectedMusic:action.data,
                time:0,
                lyricTimeCha:[]
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
        case Type.IS_PLAY:
            return {
                ...state,
                isPlay:action.data
            }
        case Type.INDEX_SELECTED:
            return {
                ...state,
                indexSelected:action.data
            }
        default:
            return state
    }
}
export default getNewState;