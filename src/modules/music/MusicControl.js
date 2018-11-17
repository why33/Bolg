import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {IconT} from '@type'
import '@src/modules/music/music.css'
import { ToolTip,PromptBox,Range,DrawerBox,Table } from '@cncomp'
import connect from '@connect'


const Root=styled.div`
    position:fixed;
    z-index:10;
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
                    cursor:pointer;
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
            & .muted{
                position:relative;
                text-decoration:overline;
                &::after{
                    position:absolute;
                    content:"";
                    bottom:45%;
                    left:0;
                    width:120%;
                    height:0.3vh;
                    background:#fff;
                    transform:rotate(45deg);
                    -moz-transform:rotate(45deg);
                    -webkit-transform:rotate(45deg);
                    -o-transform:rotate(45deg);
                }
            }
           
        }
    }
    

`
@connect('music') 
class MusicControl extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShow:false,
            isPlay:true,
            isRepeat:true,
            isVolumeShow:false,
            isLock:false,
            duration:null,//当前音频长度
            currentTime:'00:00',//当前播放的位置,
            value:'0%',
            number:0,//当前歌曲的索引
            volumeValue:0.3,
            isListShow:false,//播放列表是否显示

        }
    }
    componentWillMount(){ 
        this.props.loadMusicFun();
    }
    componentDidMount(){
        setTimeout(()=>{
            this.props.selectMusicFun(this.state.number);
            this.onPlay();
        },100)
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
            isVolumeShow:!this.state.isVolumeShow
        },()=>{
            this.state.isVolumeShow && setTimeout(()=>{
                this.setState({
                    isVolumeShow:!this.state.isVolumeShow
                })
            },5000)
        })

    }
    isLockFun=()=>{
        this.setState({
            isLock:!this.state.isLock
        },()=>{
            this.state.isLock && this.setState({
                isShow:true
            })
        })
    }
    //上一首
    isBackFun=()=>{
        this.setState({
            number:(this.state.number===0)?this.props.musicAll.length-1:this.state.number-1,
            value:'0%'
        },()=>{
            setTimeout(()=>{
                this.props.selectMusicFun(this.state.number);
                if(this.state.isPlay){
                    this.onPlay(); 
                    this.audio.play();
                }
            },10)
        })
    }
    //下一首
    isForwardFun=()=>{
        this.setState({
            number:(this.state.number===this.props.musicAll.length-1)?0:this.state.number+1,
            value:'0%'
        },()=>{
            setTimeout(()=>{
                this.props.selectMusicFun(this.state.number);
                if(this.state.isPlay){
                    this.onPlay(); 
                    this.audio.play();
                }
            },10)
           
        })
    }
    onMouseenter=(e)=>{
        e.stopPropagation();
        this.div.classList.replace('hide',"show");
    }
    onMouseleave=(e)=>{
        e.stopPropagation();
        !this.state.isLock && this.div.classList.replace('show',"hide");
        this.state.isListShow && this.div.classList.replace('hide',"show");
        this.state.isVolumeShow && this.div.classList.replace('hide',"show");
    }
    stopFun=()=>{
        this.audio.currentTime=0;
        this.audio.pause();
        this.setState({
            isPlay:false
        })
    }
    onPlay=()=>{
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
            if(this.audio.ended){
                this.state.isRepeat ? this.audio.play() : this.isForwardFun();
            }
        }
    }
    listBoxFun=()=>{
        this.setState({
            isListShow:!this.state.isListShow
        })
    }
    clickRangeFun=(e)=>{
        e.stopPropagation();
        let valueNow=(e.clientX-this.range.offsetLeft)/this.range.clientWidth;
        this.audio.currentTime=valueNow*this.audio.duration;
        this.setState({
            value:(valueNow*100).toFixed(2)+"%"
        })
       
    }
    
    volumeFun=(range,obj)=>{
        let offsetP=range.offsetParent;
        let num=null;
        while(offsetP!=null){
            offsetP=offsetP.offsetParent;
            offsetP && (num=offsetP.offsetTop+(26-10)-100);
        }
        let valueNow=(1-(obj.clientY-num)/range.offsetHeight).toFixed(1);
        this.setState({
            volumeValue:valueNow
        },()=>{
            this.audio.volume=this.state.volumeValue;
            setTimeout(()=>{
                this.setState({
                    isVolumeShow:false
                })
            },5000)
        })
    }
    onClickList=()=>{
        this.setState({
            isListShow:false
        })
    }
    //播放列表播放
    playBFun=(index)=>{
        this.setState({
            number:index,
            isPlay:true
        },()=>{
            setTimeout(()=>{
                this.props.selectMusicFun(index);
                this.onPlay(); 
                this.audio.play();
            },10)
        })
    }
    //播放列表停止
    pauseBfun=(index)=>{
        this.stopFun();
    }
    //播放列表下载
    downMusic=(index)=>{
        // let url=this.props.musicAll[index].play_url.slice(22);
        // axios.get(`/api/${url}`)
        // .then((data)=>{
            // let blob = new Blob([data.data], {
            //     type: 'application/octet-stream'
            // });
            //  let url = window.URL.createObjectURL(blob)
            //  let a = document.createElement('a')
            //  a.href = url
            //  a.download ='lll.mp3';
            //  a.click()
            //  document.body.removeChild(a)
        // })
        let aEle = document.createElement('a')
        aEle.download=this.props.musicAll[index].audio_name;
        aEle.href=this.props.musicAll[index].play_url;
        aEle.target="_blank";
        document.body.appendChild(aEle)
        aEle.click();
        document.body.removeChild(aEle)
    }
    render(){
        const {selectedMusic,musicAll}=this.props;
        const heardData=[{
                key:'name',
                title:'歌曲',
                width:'50%'
            },{
                key:'author',
                title:'歌手',
                width:'30%'
            }
        ];
        let data=[];
        musicAll && musicAll.forEach((item,index)=>{
            data.push({
                name:item.song_name,
                author:item.author_name,
            })
        })
        return (
            <Root className={`${this.state.isShow?'show':'hide'}`} onMouseEnter={this.onMouseenter} onMouseLeave={this.onMouseleave} ref={div=>this.div=div}>
                <audio autoPlay ref={audio=>this.audio=audio} src={selectedMusic && selectedMusic.play_url}>该浏览器不支持</audio>
                <div className='lockSty'>
                    <Icon  icon={this.state.isLock?IconT.faLock:IconT.faLockOpen} onClick={this.isLockFun}/>
                </div>
                <div className='controlSty'>
                    <div className='control_play'>
                        <ToolTip title="上一首" direction='left'><Icon icon={IconT.faBackward} onClick={this.isBackFun}/></ToolTip>
                        <ToolTip title={this.state.isPlay?"播放":"暂停"} direction='top'><Icon icon={this.state.isPlay?IconT.faPause:IconT.faPlay} onClick={this.isPlayFun}/></ToolTip>
                        <ToolTip title="下一首" direction='right'><Icon icon={IconT.faForward} onClick={this.isForwardFun}/></ToolTip>
                    </div>
                    <div className='control_range'>
                        <p>{selectedMusic && selectedMusic.audio_name}</p>
                        <div>
                            <span className="control_progress" onClick={this.clickRangeFun} ref={range=>this.range=range}>
                               <span style={{width:this.state.value}}></span>
                            </span> 
                            <span className="control_timeStart">{this.state.currentTime}</span>
                            <span className="control_timeEnd">{this.state.duration}</span>
                        </div>
                    </div>
                    <div className='control_but'>
                        <ToolTip title="停止" direction='top'><Icon icon={IconT.faStop} onClick={this.stopFun}/></ToolTip>
                        <ToolTip title={this.state.isRepeat?"循环播放":"随机播放"} direction='bottom'><Icon icon={this.state.isRepeat?IconT.faRepeat:IconT.faRandom} onClick={this.isRepeatFun}/></ToolTip>
                        <PromptBox title='音量'  visible={this.state.isVolumeShow} content={<Range value={this.state.volumeValue} onClick={this.volumeFun}/>}>
                            <ToolTip title="音量"><span className={`${Number(this.state.volumeValue)===0?'muted':''}`}><Icon icon={IconT.faVolume} onClick={this.isVolumeFun} /></span></ToolTip>
                        </PromptBox>
                        <DrawerBox 
                            content={<Table height='18vh' heardData={heardData} selectedNum={this.state.number} data={data} buttons={[<Icon icon={IconT.faPlay} onClick={this.playBFun}/>,<Icon icon={IconT.faStop} onClick={this.pauseBfun}/>,<Icon icon={IconT.faDownload} onClick={this.downMusic}/>]}/>} 
                            title={`播放列表 （${this.props.musicAll.length}）`} 
                            width='60%' 
                            position={{position:'bottom',sty:{bottom:'8vh',left:'20%'}}}
                            visible={this.state.isListShow} 
                            onClose={this.onClickList}
                        >
                            <ToolTip title="播放列表" direction='bottom'><Icon icon={IconT.faList} onClick={this.listBoxFun}/></ToolTip>
                        </DrawerBox>
                        
                    </div>
                </div>
            </Root>
        )
    }
}
export default MusicControl;