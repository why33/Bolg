import Type from './Type';
import axios from 'axios';
import {MusicJson} from '@type'
const self={
    loadMusicFun:()=>dispatch=>{
        MusicJson.forEach(item=>{
             axios.get(item)
                .then(data=>{
                    let index=data.data.indexOf("(");
                    let newMusicObj=JSON.parse(data.data.slice(index+1,-2));
                    dispatch({
                        type:Type.LOAD_MUSIC,
                        data:newMusicObj.data
                    })
                })
        })
    },
    selectMusicFun:(index)=>(dispatch,getState)=>{
        dispatch({
            type:Type.SELECT_MUSIC,
            data:getState().music.musicAll[index]
        })
    },
    getTimeFun:obj=>dispatch=>{
        if(obj){
            dispatch({
                type:Type.GET_TIME,
                data:obj.time,
            }) 
        }
    },
    //歌词差
    lyricTimeChaFun:obj=>dispatch=>dispatch({
        type:Type.GET_LYRIC_TIME_CHA,
        data:obj
    }),
    //是否播放
    isPlayFunction:val=>dispatch=>dispatch({
        type:Type.IS_PLAY,
        data:val
    }),
    //播放索引
    indexSelectedFun:val=>dispatch=>dispatch({
        type:Type.INDEX_SELECTED,
        data:val
    }),
}
export default self;