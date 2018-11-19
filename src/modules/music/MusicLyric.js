import React from 'react'
import styled from 'styled-components'
import connect from '@connect'

const Root=styled.div`
    width:100%;
    height:100%;
    border:1px solid red;
    overflow-y:auto;
    .lyricSty{
        width:100%;
        list-style:none;
        font-size:1.2vh;
        line-height:2vh;
    }
    


`

@connect("music")
class MusicLyric extends React.Component{
    render(){
        console.log(this.props)
        let lyric=null;
        let lyricObj=[];
        if(this.props.selectedMusic.lyrics){
            lyric=this.props.selectedMusic.lyrics.split("[");
            lyricObj=lyric.map(item=>{
                let strLyric=item.split("]");
                return {
                    time:strLyric[0],
                    value:strLyric[1]
                }
            })
            console.log(lyricObj)


        }
        return (
            <Root>
                <ul className='lyricSty'>
                   {
                       lyricObj.map(item=>(
                           <li key={item.time}>{item.value}</li>
                       ))
                   }
                </ul>
            </Root>
        )
    }
}
export default MusicLyric;