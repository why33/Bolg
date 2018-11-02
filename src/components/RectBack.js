import React from 'react'
import styled, { keyframes } from 'styled-components'

const aniLoading=keyframes`
    0%{
        opacity:0;
        transform:scale(.1);
        top:-30%;
    }
    100%{
        opacity:1;
        transform:scale(1);
        left:0;
    }
`
const Root=styled.div`
    width:${props=>props.w*10+"%"};
    height:${props=>props.h*10+"%"};
    box-sizing:border-box;
    position:relative;
    top:${props=>props.p*10+"%"};
    animation:${aniLoading} .8s ease;
    padding:10px;
    .titleSty{
        width:100%;
        height:100%;
        background:rgba(255,255,255,.5);
    }
    
`
export default  class RectBack extends React.Component{
    render(){
        const {w,h,p,t}=this.props
        return (
            <Root w={w} h={h} p={p} t={t}>
                <div className='titleSty'>{t}</div>
            </Root>
        )
    }

}