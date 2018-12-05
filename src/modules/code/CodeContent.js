import React from 'react'
import styled from 'styled-components'
import { Tab,ToolTip } from '@cncomp';
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {IconT} from '@type'

const Root=styled.div`
    width:100%;
    height:100%;
    box-sizing:border-box;
    padding:10px;
`

export default class CodeContent extends React.Component{
    render(){
        const buttons={
            type:'icon',
            arr:[(<ToolTip title='运行代码' direction='right'><Icon icon={IconT['faShareSquare']} /></ToolTip>)]
        }
        const data=[{title:'HTML',comp:'HTML',key:1},{title:'javaScript',comp:'javaScript',key:2},{title:'CSS',comp:'CSS',key:3}]
        return (
            <Root>
                <Tab buttons={buttons} data={data}/>
            </Root>
        )
    }
}