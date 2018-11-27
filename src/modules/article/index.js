import React from 'react'
import styled from 'styled-components'
import {RectBack,RectContent,RectClick} from '@comp/RectBack'
import ArticleList from './ArticleList'
import ArticleContent from './ArticleContent'
import connect from '@connect'


@connect('article')
class Article extends React.Component{
    constructor(props){
        super(props);
        this.state={
            checked0:true,
            checked1:false,
            checked2:false
        }
    }
    componentDidMount(){
        this.setState({
            checked0:false,
            checked1:false,
            checked2:false,
            [`checked${this.props.indexArticle}`]:true
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.indexArticle!==this.props.indexArticle){
            this.setState({
                checked0:false,
                checked1:false,
                checked2:false,
                [`checked${nextProps.indexArticle}`]:true
            })
        }
    }
    clickFun=(val)=>{
        this.props.path_change_fun(val);
    }
    onClickTipFun=(val)=>{
        this.setState({
            checked0:false,
            checked1:false,
            checked2:false,
            [`checked${val}`]:true
        })
        this.props. articleChangeIndexFun(val);
    }
    render(){
        return (
           <div className='articleSty'>
               <RectClick w={2} h={2.7} p={0} t='Web前端' onClick={this.onClickTipFun.bind(this,0)} checked={this.state.checked0}/>
               <RectContent w={2.5} h={10} p={0} component={ArticleList}/>
               <RectContent w={5.5} h={10} p={0} component={ArticleContent}/>
               <RectClick w={2} h={2.7} p={-7.4} t='言之有趣' onClick={this.onClickTipFun.bind(this,1)} checked={this.state.checked1}/>
               <RectClick w={2} h={2.7} p={-4.8}  l={-2}  t='胡言乱语' onClick={this.onClickTipFun.bind(this,2)} checked={this.state.checked2}/>
               <RectBack w={2} h={1.9} p={-2} l={-4} t='index' icon="faHome" onClick={this.clickFun.bind(this,'/')} link="/"/>
           </div>
        )
    }
}
export default Article;