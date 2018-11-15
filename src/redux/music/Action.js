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
}
export default self;