import React from 'react'
import styled from 'styled-components'
import connect from '@connect'



const Root=styled.div`
    position:relative;
    width:100%;
    height:100%;
    overflow-y:auto;
    .lyricSty{
        position:absolute;
        width:100%;
        padding-top:3%;
        top:${props=>(-props.top)*1.5+'vh'};
        list-style:none;
        font-size:1.2vh;
        line-height:2.5vh;
        text-align:center;
        color:#525252;
        font-weight:bold;
        transition:top .5s;
        .active{
            color:#fff;
            background:#b8783f;
        }
    }
    &::-webkit-scrollbar{
        display:none;
    }
    


`

@connect("music")
class MusicLyric extends React.Component{
    constructor(props){
        super(props);
        this.state={
            lyricObj:[],
            time:0,
        }
    }
    componentDidMount(){
        let lyric=null;
            let lyricObjs=[];
            let lyricTimeCha=[];
            if(this.props.selectedMusic.lyrics){
                lyric=this.props.selectedMusic.lyrics.split("[");
                lyricObjs=lyric.map((item,index)=>{
                    let strLyric=item.split("]");
                    let lyricTime=strLyric[0].split(":");
                    let numTime=Math.floor(Number(lyricTime[0]*60)+Number(lyricTime[1]));
                    return {
                        time:numTime,
                        value:strLyric[1]
                    }
                })
                let objL=lyricObjs.filter(item=>item.value);
                 for(let i=0;i<objL.length;i++){
                    if(i!==objL.length-1){
                        lyricTimeCha.push({
                            time:objL[i].time,
                            cha:objL[i+1].time-objL[i].time
                        })
                    }
                }
                this.setState({
                    lyricObj:objL,
                    time:this.props.selectedMusic.timelength,
                })
                this.props.lyricTimeChaFun(lyricTimeCha)
            }
           
    }
    componentWillReceiveProps(nextProps){
        if(this.props.selectedMusic!==nextProps.selectedMusic){
            let lyric=null;
            let lyricObjs=[];
            let lyricTimeCha=[];
            lyric=nextProps.selectedMusic.lyrics.split("[");
            lyricObjs=lyric.map((item,index)=>{
                let strLyric=item.split("]");
                let lyricTime=strLyric[0].split(":");
                let numTime=Math.floor(Number(lyricTime[0]*60)+Number(lyricTime[1]));
                return {
                    time:numTime,
                    value:strLyric[1]
                }
            })
            let objL=lyricObjs.filter(item=>item.value);
             for(let i=0;i<objL.length;i++){
                if(i!==objL.length-1){
                    lyricTimeCha.push({
                        time:objL[i].time,
                        cha:objL[i+1].time-objL[i].time
                    })
                }
            }
            this.setState({
                lyricObj:objL,
                time:nextProps.selectedMusic.timelength,
            })
            this.props.lyricTimeChaFun(lyricTimeCha)
        }
    }
    render(){
        let top=(this.props.time && this.state.time)?(this.props.time*1000/this.state.time*this.state.lyricObj.length):0;
        return (
            <Root top={top}>
                <ul className='lyricSty'>
                   {
                        this.state.lyricObj.map((item,index)=>(
                            <li key={item.time+"-"+index} style={{top:'-10%'}} className={(item.time===this.props.time)?"active":""}>{item.value}</li>
                        ))
                   }
                </ul>
            </Root>
        )
    }
}
export default MusicLyric;