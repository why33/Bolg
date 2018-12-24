import React from 'react'
import connect from '@connect'
import styled from 'styled-components'
import NoFindPage from './FindNo'

const Root=styled.div`
    width:100%;
    height:100%;
    box-sizing:border-box;
    padding:10px;
    overflow-y:auto;
    overflow-x:hidden;
    li{
        list-style-position:inside;
    }
    p{
        text-indent:2em;
        margin:1vh;
    }
    code{
        font-size:1.5vh;
        font-weight:bolder;
        font-family:"Times New Roman",Georgia,Serif;
    }
    h1,h2,h3,h4,h5,h6{
        margin:1vh;
    }
    p[]
    &::-webkit-scrollbar {
        width:6px; 
        background: transparent;
        border:none;
    }
    &::-webkit-scrollbar-thumb{
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #afd0e7;
    }

`

@connect('article','index')
class ArticleContent extends React.Component{
    render(){
        return (
            <Root>
                {this.props.htmlContent==='404'?(<NoFindPage/>):(
                    <div ref={content=>this.content=content} dangerouslySetInnerHTML={{__html:this.props.htmlContent}}></div>
                )}
            </Root>
            
        )
    }
}

export default ArticleContent;