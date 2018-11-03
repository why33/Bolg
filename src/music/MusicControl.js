import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {IconT} from '@type'

const Root=styled.div`
    position:fixed;
    width:100%;
    height:10vh;
    background:rgba(204,255,255,.3);
    left:0;
    bottom:0;
    .lockSty{
        position:absolute;
        top:0;
        right:0;
        font-size:20px;
    }


`

export default class MusicControl extends React.Component{
    render(){
        return (
            <Root>
                ddddd
                <Icon className='lockSty' icon={IconT.faLockOpen}/>
            </Root>
        )
    }
}