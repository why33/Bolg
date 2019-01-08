import React from 'react'
import {RectBack} from '@comp/RectBack' 

export default class Main extends React.Component{
    clickFun=(val)=>{
        this.props.path_change_fun(val);
    }
    render(){
       
        return (
            <div className='mainSty'>
                <RectBack w={2} h={6} p={0} t='music' icon="faMusic" onClick={this.clickFun.bind(this,'/music')} link="/music"/>   
                <RectBack w={5} h={3} p={0} t='article' icon="faArticle" onClick={this.clickFun.bind(this,'/article')} link="/article"/>
                <RectBack w={3} h={3} p={0} t='picture' icon="faPhoto" onClick={this.clickFun.bind(this,'/photo')} link="/photo"/>
                <RectBack w={2} h={4} p={0} t='index' icon="faHome" onClick={this.clickFun.bind(this,'/')} link="/"/>
                <RectBack w={5} h={7} p={-3} t='code' icon="faCode" onClick={this.clickFun.bind(this,'/code')} link="/code"/>
                <RectBack w={3} h={4} p={-3} t='video' icon="faFilm"/>
                <RectBack w={3} h={3} p={-6} t='intro' icon="faAddressCard"/>
            </div>
        )
    }
}