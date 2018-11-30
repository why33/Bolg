import React from 'react'
import connect from '@connect'
import styled from 'styled-components'

const Root=styled.div`
    width:100%;
    height:100%;
    box-sizing:border-box;
    padding:5px;
    padding-left:20px;

`

@connect('article')
class ArticleContent extends React.Component{
    componentWillReceiveProps(nextProps){
        if(nextProps.htmlContent!==this.props.htmlContent){
            this.content.innerHTML=nextProps.htmlContent;
        }
    }
    render(){
        return (
            <Root>
               <div ref={content=>this.content=content}></div>
            </Root>
            
        )
    }
}
export default ArticleContent;