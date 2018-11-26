import React from 'react'
import styled from 'styled-components'
import {RectBack,RectContent,RectClick} from '@comp/RectBack'
import ArticleList from './ArticleList'
import connect from '@connect'


// @connect('article')
class Article extends React.Component{
    clickFun=(val)=>{
        this.props.path_change_fun(val);
    }
    render(){
        return (
           <div className='articleSty'>
               <RectClick w={2} h={2.7} p={0} t='Web前端'/>
               <RectContent w={2.5} h={10} p={0} component={ArticleList}/>
               <RectContent w={5.5} h={10} p={0} component={()=>3333}/>
               <RectClick w={2} h={2.7} p={-7.4} t='ss'/>
               <RectClick w={2} h={2.7} p={-4.8}  l={-2}  t='ss'/>
               <RectBack w={2} h={1.9} p={-2} l={-4} t='index' icon="faHome" onClick={this.clickFun.bind(this,'/')} link="/"/>

           </div>
        )
    }
}
export default Article;