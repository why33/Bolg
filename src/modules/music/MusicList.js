import React from 'react'
import connect from '@connect'
import styled from 'styled-components'
import {Table} from '@cncomp'

const Root=styled.div`
    width:100%;
    height:100%;
    box-sizing:border-box;
    padding:0 1vh;
    .headSty{
        width:100%;
        margin:8% 0 2%;
        font-size:1.8vh;
    }
    .Table{
        &>table .Table-thead>tr{
           background:#9c6735;
           color:#fff;
        }
        td{
            padding:1vh 0;
        }
        .Table-body{
            border-bottom:1px solid #c4c0c7;
        }


    }
    
`

@connect('music')
class MusicList extends React.Component{
    render(){
        const heardData=[{
            key:'name',
            title:'歌曲',
            width:'40%'
        },{
            key:'author',
            title:'歌手',
            width:'30%;',
        },{
            key:'time',
            title:'时长',
            width:'20%'
        }];
        let data=[];
        this.props.musicAll.forEach(item=>{
            let author='';
            let timeD=null;
            item.authors.forEach((au,i)=>{
                author+=au.author_name+(i===(item.authors.length-1)?"":"-");
            });
            let TimeEnd=item.timelength/60/1000;
            let timeE=String(TimeEnd).split('.');
            timeD=`${(10-timeE[0])?('0'+timeE[0]):timeE[0]}:${String(timeE[1]*10).slice(0,2)}`;
            data.push({
                name:item.song_name,
                author:author,
                time:timeD
            })
        })
        return (
            <Root>
                <div className='headSty'>{`播放列表 ( ${this.props.musicAll.length} )`}</div>
                <Table width="100%" height="85%" data={data} heardData={heardData}/>
            </Root>
        )
    }
}
export default MusicList