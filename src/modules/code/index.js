import React from 'react'
import {RectBack,RectContent} from '@comp/RectBack'
import CodeList from './CodeList'
import CodeContent from './CodeContent'

class Code extends React.Component{
    clickFun=(val)=>{
        this.props.path_change_fun(val);
    }
    render(){
        return (
            <div className='codeSty'>
                <RectContent w={2} h={8} p={0} component={CodeList}/>
                <RectContent w={8} h={10} p={0} component={CodeContent}/>
                <RectBack w={2} h={2} p={-2} t='index' icon="faHome" onClick={this.clickFun.bind(this,'/')} link="/" aniNO/>
            </div>
        )
    }
}
export default Code;