import React from 'react'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {IconT} from '@type'
import { Link} from 'react-router-dom'
import { COMBINATOR } from 'postcss-selector-parser';

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
    cursor:${props=>props.checked?"pointer":"default"};
    .titleSty{
        position:relative;
        width:100%;
        height:100%;
        box-shadow: 0 0 0 1px hsla(240,0%,100%,.3) inset,
        0 3px 20px 1px rgba(0, 0, 0, 0.3);
        border-radius:10px;
        border:1px solid transparent;
        svg{
            position:absolute;
            width:25%;
            height:30%;
            top:0;
            left:0;
            right:0;
            bottom:0;
            color:#666666;
            margin:auto;
            
        }
    }
    .titleSty::before{
        content:"";
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        box-sizing:border-box;
        padding:10px;
        background:rgba(255,255,255,.45);
        background-clip:content-box;
        -webkit-filter: blur(5px);
    　　-moz-filter: blur(5px);
    　　-ms-filter: blur(5px);
    　　filter: blur(5px);
    }
    
`
// 点击跳转方块
class RectBack extends React.Component{
    render(){
        const {w,h,p,t,icon,link}=this.props;
        let path=link ? link:'./';
        return (
            <Root w={w} h={h} p={p} t={t} onClick={this.props.onClick} checked>
                <Link to={path}>
                    <div className='titleSty'>
                        <Icon icon={IconT[icon]}/>
                    </div>
                </Link>
            </Root>
           
            
        )
    }

}
// 内容方块
class RectContent extends React.Component{
    render(){
        const {w,h,p,component}=this.props;
        console.log(component)
        return (
            <Root w={w} h={h} p={p}>
                <div className='titleSty'>
                    ddd
                </div>
            </Root>
        )
    }
}
export {RectBack,RectContent}