import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {IconT,MusicJson} from '@type'
import '@src/modules/music/music.css'
import { ToolTip,PromptBox,Range } from '@cncomp'
import axios from 'axios'
import connect from '@connect'

const Root=styled.div`
    position:fixed;
    width:100%;
    height:8vh;
    background:rgba(204,255,255,.3);
    left:0;
    .lockSty{
        position:absolute;
        top:-3vh;
        right:10px;
        width:6vh;
        height:2vh;
        text-align:center;
        padding-top:1vh;
        background:rgba(204,255,255,.3);
        border-radius:50% 50% 0 0;
        svg{
            font-size:2vh;
            color:#fff;
            transform:rotateY(180deg);
            -ms-transform:rotateY(180deg);
            -webkit-transform:rotateY(180deg);
            cursor:pointer;
        }
    }
    .controlSty{
        width:90%;
        height:100%;
        margin:0 auto;
        display:flex;
        svg{
            cursor:pointer;
            color:#fff;
        }
        .control_play{
            flex:2;
            display:flex;
            justify-content:space-around;
            align-items:center;
            font-size:20px;
            svg:nth-of-type(2){
                border:2px solid #fff;
                padding:10px;
                border-radius:50%;
            }

        }
        .control_range{
            flex:7;
            box-sizing:border-box;
            padding:0 10px;
            color:#ffff;
            p{
                display:block;
                width:100%;
                font-size:1.5vh;
                line-height:3.5vh;
                font-weight:bold;
                text-shadow:0 0 1px #000;
                margin-bottom:5px;
            }
            &>div{
                display:flex;
                flex-wrap:wrap;
                justify-content:space-between;
                .control_progress{
                    display:block;
                    width:100%;
                    height:3px;
                    background:#c0c0c0;
                    margin-bottom:0.2vh;
                    span{
                        display:block;
                        width:0;
                        height:100%;
                        background:#fff;
                    }
               }
               .control_timeStart,
               .control_timeEnd{
                   color:#d7d7d7;
                   font-size:10px;
               }
            }
             
        }
        .control_but{
            flex:2;
            display:flex;
            justify-content:space-around;
            align-items:center;
            font-size:2vh;
            color:#fff;
            span{
                cursor:pointer;
            }
        }
    }
    

`
@connect('music') 
class MusicControl extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isPlay:false,
            isRepeat:true,
            isVolume:true,
            isLock:false,
            duration:null,//当前音频长度
            currentTime:'00:00',//当前播放的位置,
            value:'0%'
        }
    }
    isPlayFun=()=>{
        this.state.isPlay ? this.audio.pause():this.audio.play();
        this.setState({
            isPlay:!this.state.isPlay,
            currentTime:(this.audio.currentTime/60).toFixed(2)
        })
    }
    isRepeatFun=()=>{
        this.setState({
            isRepeat:!this.state.isRepeat
        })
    }
    isVolumeFun=()=>{
        this.setState({
            isVolume:!this.state.isVolume
        })
    }
    isLockFun=()=>{
        this.setState({
            isLock:!this.state.isLock
        },()=>{
           
        })
    }
    onMouseenter=(e)=>{
        e.stopPropagation();
        this.div.classList.replace('hide',"show");
    }
    onMouseleave=(e)=>{
        e.stopPropagation();
        // !this.state.isLock && this.div.classList.replace('show',"hide");
       
    }
    componentDidMount(){
        setTimeout(()=>{
            this.props.selectMusicFun(1);
            this.audio.load();
            this.audio.oncanplay=()=>{
                let TimeEnd=this.audio.duration/60;
                let timeE=String(TimeEnd).split('.');
                this.setState({
                    duration:`${(10-timeE[0])?('0'+timeE[0]):timeE[0]}:${timeE[1].slice(0,2)}`
                })
            }
            this.audio.ontimeupdate=()=>{
                let TimePlay=this.audio.currentTime/60;
                let TimeP=String(TimePlay).split('.');
                this.setState({
                    currentTime:`${(10-TimeP[0])?('0'+TimeP[0]):TimeP[0]}:${TimeP[1]?TimeP[1].slice(0,2):'00'}`,
                    value:(this.audio.currentTime/this.audio.duration*100).toFixed(2)+"%"
                })
            
            }
        },100)
        
    }
    render(){
        const {selectedMusic}=this.props;
        return (
            <Root className='show' onMouseEnter={this.onMouseenter} onMouseLeave={this.onMouseleave} ref={div=>this.div=div}>
                <audio ref={audio=>this.audio=audio} src={selectedMusic.play_url}>该浏览器不支持</audio>
               
                <div className='lockSty'>
                    <Icon  icon={this.state.isLock?IconT.faLock:IconT.faLockOpen} onClick={this.isLockFun}/>
                </div>
                <div className='controlSty'>
                    <div className='control_play'>
                        <ToolTip title="上一首" direction='left'><Icon icon={IconT.faBackward}/></ToolTip>
                        <ToolTip title={this.state.isPlay?"播放":"暂停"} direction='top'><Icon icon={this.state.isPlay?IconT.faPause:IconT.faPlay} onClick={this.isPlayFun}/></ToolTip>
                        <ToolTip title="下一首" direction='right'><Icon icon={IconT.faForward}/></ToolTip>
                    </div>
                    <div className='control_range'>
                        <p>{selectedMusic.audio_name}</p>
                        <div>
                            <span className="control_progress">
                               <span style={{width:this.state.value}}></span>
                            </span> 
                            <span className="control_timeStart">{this.state.currentTime}</span>
                            <span className="control_timeEnd">{this.state.duration}</span>
                        </div>
                    </div>
                    <div className='control_but'>
                        <ToolTip title="停止" direction='top'><Icon icon={IconT.faStop}/></ToolTip>
                        <ToolTip title={this.state.isRepeat?"循环播放":"随机播放"} direction='bottom'><Icon icon={this.state.isRepeat?IconT.faRepeat:IconT.faRandom} onClick={this.isRepeatFun}/></ToolTip>
                        <ToolTip title="歌词" direction='top'><span>词</span></ToolTip>
                        <PromptBox title='播放列表'  content={<Range value="0.3" />}>
                            <ToolTip title="音量"><Icon icon={this.state.isVolume?IconT.faVolume:IconT.faVolumeOff} onClick={this.isVolumeFun}/></ToolTip>
                        </PromptBox>
                        <ToolTip title="播放列表" direction='bottom'><Icon icon={IconT.faList}/></ToolTip>
                       
                        
                    </div>
                </div>
            </Root>
        )
    }
}
export default MusicControl;