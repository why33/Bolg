import React from 'react'
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import {IconT} from '@type'
import connect from '@connect'
import {ToolTip} from '@cncomp'

const Root=styled.div`
   
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    .buttonStyle{
        display:flex;
        justify-content:space-around;
        width:98%;
        margin:15% auto 0;
        padding-bottom:2vh;
        border-bottom:0.1vh solid #919191;
        svg{
            font-size:2vh;
            padding:0.5vh;
            color:#525252; 
            cursor:pointer;
        }
    }
    .detailSty{
        flex-grow:1;
        width:80%;
        color:#454545;
        list-style:none;
        margin:2vh auto;
        .imgSty{
            width:100%;
            height:12vh;
            img{
                width:100%;
                height:100%;
            }
        }
        .titSty{
            font-size:1.8vh;
            font-weight:bold;  
            margin:1vh 0;
        }
        .contSty{
            font-size:1.5vh;
            font-family:"serif";
            line-height:2vh;
            span{
                font-size:1vh;
                color:#666666;
            }
        }

    }

`
@connect('music')
class MusicButControl extends React.Component{
    //是否播放
    isPlayF=()=>{
        this.props.isPlayFunction(!this.props.isPlay)
    }
    // 上一首
    Backfun=()=>{
        let index=(this.props.indexSelected===0)?(this.props.musicAll.length-1):(this.props.indexSelected-1);
        this.props.selectMusicFun(index);
        this.props.indexSelectedFun(index);
    }
    //下一首
    Forwordfun=()=>{
        let index=(this.props.indexSelected===this.props.musicAll.length-1)?0:(this.props.indexSelected+1);
        this.props.selectMusicFun(index);
        this.props.indexSelectedFun(index);
    }
    render(){
        const {selectedMusic}=this.props;
        let timeD=null;
        let author="";
        if(selectedMusic.timelength){
            let TimeEnd=selectedMusic.timelength/60/1000;
            let timeE=String(TimeEnd).split('.');
            timeD=`${(10-timeE[0])?('0'+timeE[0]):timeE[0]}:${String(timeE[1]*10).slice(0,2)}`;
        }
        if(selectedMusic.authors){
            for(let i=0;i<selectedMusic.authors.length;i++){
                author+=selectedMusic.authors[i].author_name+(i===(selectedMusic.authors.length-1)?"":"-");
            }
        }
        return (
            <Root>
                <div className="buttonStyle">
                    <ToolTip title="上一首" ><Icon icon={IconT.faBackward} onClick={this.Backfun}/></ToolTip>
                    <ToolTip title={this.props.isPlay?"播放":"暂停"} ><Icon icon={this.props.isPlay?IconT.faPause:IconT.faPlay} onClick={this.isPlayF}/></ToolTip>
                    <ToolTip title="下一首"><Icon icon={IconT.faForward} onClick={this.Forwordfun}/></ToolTip>
                </div>
                <ul className='detailSty'>
                    <li className='imgSty'><img src={selectedMusic.img} alt='专辑图片'/></li>
                    <li className='titSty'>{selectedMusic.song_name}</li>
                    <li className='contSty'><span>专辑: </span>{selectedMusic.album_name}</li>
                    <li className='contSty'><span>歌手: </span>{author}</li>
                    <li className='contSty'><span>时长: </span>{timeD}</li>
                </ul>
            </Root>
        )
    }
}
export default  MusicButControl; 