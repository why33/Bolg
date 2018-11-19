import React from 'react'
import {RectBack,RectContent} from '@comp/RectBack' 
import MusicButControl from './MusicButControl'
import MusicList from './MusicList'
import MusicLyric from './MusicLyric'
import connect from '@connect'

@connect('music')
class Music extends React.Component{
    clickFun=(val)=>{
        this.props.path_change_fun(val);
    }
    render(){
        return (
            <div className='musicSty'>
                <RectContent w={2.5} h={8} p={0}  component={MusicButControl}/>
                <RectContent w={4.5} h={10} p={0} component={MusicList}/>
                <RectContent w={3} h={10} p={0} component={MusicLyric}/>
                <RectBack w={2.5} h={2} p={-2} t='index' icon="faHome" onClick={this.clickFun.bind(this,'/')} link="/"/>
            </div>
        )
    }
}
export default Music;