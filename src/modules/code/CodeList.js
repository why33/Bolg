import React from 'react'
import styled from 'styled-components'
import {Tree} from '@cncomp'
import {CodeJson} from '@type'
import connect from '@connect'

const Root=styled.div`
    width:100%;
    height:100%;
    box-sizing:border-box;
    padding:10px;

`
const {TreeNode}=Tree;


@connect('code')
class CodeList extends React.Component{
    onClick=(data)=>{
        data.url && this.props.codeSelectObjFun(data);
        data.url && this.props.getCodeContentHTMLFun(data.url);
    }
    render(){
        return (
            <Root>
                <Tree data={CodeJson} {...this.props} onClick={this.onClick}/>
            </Root>
        )
    }
}
export default CodeList;