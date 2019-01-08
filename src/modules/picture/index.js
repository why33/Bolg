import React from 'react'
import {RectBack,RectContent} from '@comp/RectBack'
import connect from '@connect'


class Picture extends React.Component{
    clickFun=(val)=>{
        this.props.path_change_fun(val);
    }
    render(){
        return (
            <div className='pictureSty'>
                
                <RectBack w={2} h={2} p={-2} t='index' icon="faHome" onClick={this.clickFun.bind(this,'/')} link="/" aniNO/>
            </div>
        )
    }
}
export default Picture;