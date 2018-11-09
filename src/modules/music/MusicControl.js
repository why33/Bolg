import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {IconT,MusicJson} from '@type'
import '@src/modules/music/music.css'
import { ToolTip } from '@cncomp'
import axios from 'axios'

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
                font-size:2vh;
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

export default class MusicControl extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isPlay:true,
            isRepeat:true,
            isVolume:true,
            isLock:false
        }
    }
    isPlayFun=()=>{
        this.setState({
            isPlay:!this.state.isPlay
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
        !this.state.isLock && this.div.classList.replace('show',"hide");
       
    }
    componentDidMount(){
        axios.get(`${MusicJson[0]}`)
            .then(data=>{
                let index=data.data.indexOf("(");
                let newMusicObj=JSON.parse(data.data.slice(index+1,-2));
                console.log(newMusicObj)
            })
    }
    render(){
        return (
            <Root className='hide' onMouseEnter={this.onMouseenter} onMouseLeave={this.onMouseleave} ref={div=>this.div=div}>
                    {/* <audio  controls="controls" src="https://m128.xiami.net/158/7158/2104115374/1806311763_1539742986573.mp3?auth_key=1542164400-0-0-d55611c6e23d138b142f41fbc57b01a6">该浏览器不支持</audio> */}
               
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
                        <p>xxxx</p>
                        <div>
                            <span className="control_progress"></span> 
                            <span className="control_timeStart">00.00</span>
                            <span className="control_timeEnd">06.00</span>
                        </div>
                    </div>
                    <div className='control_but'>
                        <ToolTip title="停止" direction='top'><Icon icon={IconT.faStop}/></ToolTip>
                        <ToolTip title={this.state.isRepeat?"循环播放":"随机播放"} direction='bottom'><Icon icon={this.state.isRepeat?IconT.faRepeat:IconT.faRandom} onClick={this.isRepeatFun}/></ToolTip>
                        <ToolTip title="歌词" direction='top'><span>词</span></ToolTip>
                        <ToolTip title="音量" direction='right'><Icon icon={this.state.isVolume?IconT.faVolume:IconT.faVolumeOff} onClick={this.isVolumeFun}/></ToolTip>
                        <ToolTip title="播放列表" direction='bottom'><Icon icon={IconT.faList}/></ToolTip>
                        
                    </div>
                </div>
            </Root>
        )
    }
}