import React from 'react'
import styled from 'styled-components'
import {Tree} from '@cncomp'

const Root=styled.div`
    width:100%;
    height:100%;
    box-sizing:border-box;
    padding:10px;

`
const {TreeNode}=Tree
export default class CodeList extends React.Component{
    render(){
        return (
            <Root>
                <Tree/>
            </Root>
        )
    }
}