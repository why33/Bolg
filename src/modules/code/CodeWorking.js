import React from 'react'
import styled from 'styled-components'

const Root=styled.div`
   width:100%;
   height:40vh;
   box-sizing:border-box;
   padding:5px;
   iframe{
       width:100%;
       height:100%;
       background:#FFF;
   }
`
export default class CodeWorking extends React.Component{
    render(){
        return (
            <Root >
                <iframe src={this.props.codeSelectObj.url} frameBorder="0"></iframe>
            </Root>
        )
    }
}