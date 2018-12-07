import React from 'react'
import styled from 'styled-components'
import {Tree} from '@cncomp'

const Root=styled.div`
    width:100%;
    height:100%;

`
const {TreeNode}=Tree
export default class CodeList extends React.Component{
    render(){
        console.log(Tree.TreeNode)
        return (
            <Root>
                <Tree/>
                <TreeNode/>
            </Root>
        )
    }
}