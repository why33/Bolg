import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {IconT} from '@type'

const Root=styled.div`
    position:fixed;
    width:100%;
    height:10vh;
    background:rgba(204,255,255,.3);
    left:0;
    bottom:0;
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
        height:80%;
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
        })
    }
    render(){
        return (
            <Root>
                <div className='lockSty'>
                    <Icon  icon={this.state.isLock?IconT.faLock:IconT.faLockOpen} onClick={this.isLockFun}/>
                </div>
                <div className='controlSty'>
                    <div className='control_play'>
                        <Icon icon={IconT.faBackward}/>
                        <Icon icon={this.state.isPlay?IconT.faPause:IconT.faPlay} onClick={this.isPlayFun}/>
                        <Icon icon={IconT.faForward}/>
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
                        <Icon icon={IconT.faStop}/>
                        <Icon icon={this.state.isRepeat?IconT.faRepeat:IconT.faRandom} onClick={this.isRepeatFun}/>
                        <span>词</span>
                        <Icon icon={this.state.isVolume?IconT.faVolume:IconT.faVolumeOff} onClick={this.isVolumeFun}/>
                        <Icon icon={IconT.faList}/>
                    </div>
                </div>
            </Root>
        )
    }
}