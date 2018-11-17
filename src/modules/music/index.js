import React from 'react'
import {RectBack,RectContent} from '@comp/RectBack' 
import MusicButControl from './MusicButControl'

class Music extends React.Component{
    clickFun=(val)=>{
        this.props.path_change_fun(val);
    }
    render(){
        return (
            <div className='musicSty'>
                <RectContent w={2} h={8} p={0}  component={MusicButControl}/>
                <RectContent w={3.5} h={10} p={0} component={'播放列表'}/>
                <RectContent w={4.5} h={10} p={0} component={'歌词'}/>
                <RectBack w={2} h={2} p={-2} t='index' icon="faHome" onClick={this.clickFun.bind(this,'/')} link="/"/>
            </div>
        )
    }
}
export default Music;