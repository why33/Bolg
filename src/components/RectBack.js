import React from 'react'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {IconT} from '@type'
import { Link} from 'react-router-dom'


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
    left:${props=>props.l*10+"%"};
    animation:${aniLoading} .8s ease;
    -webkit-animation:${aniLoading} .8s ease;
    -moz-animation:${aniLoading} .8s ease;
    padding:10px;
    cursor:pointer;
    overflow:hidden;
    .titleSty{
        position:relative;
        width:100%;
        height:100%;
        box-shadow: 0 0 0 1px hsla(240,0%,100%,.3) inset,
        0 3px 20px 1px rgba(0, 0, 0, 0.3);
        border-radius:10px;
        border:1px solid transparent;
        &>svg,
        &>div{
            position:absolute;
            width:30%;
            height:35%;
            top:0;
            left:0;
            right:0;
            bottom:0;
            color:#666666;
            z-index:2;
            margin:auto;
        }
        &>div{
            width:100%;
            text-align:center;
            font-size:2.5vh;
            svg{
                font-size:2vh;
                margin-right:0.5vh;
            }
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
        z-index:1;
        background:rgba(255,255,255,.45);
        background-clip:content-box;
        -webkit-filter: blur(5px);
    　　-moz-filter: blur(5px);
    　　-ms-filter: blur(5px);
    　　filter: blur(5px);
    }
    .titleSty:hover{
        border:2px solid #fff;
        box-shadow: 0 0 0 2px hsla(240,0%,100%,.3);
        svg{
            color:#b67d45;
        }
    }
    
    
    
`
const RootC=styled.div`
    width:${props=>props.w*10+"%"};
    height:${props=>props.h*10+"%"};
    box-sizing:border-box;
    position:relative;
    top:${props=>props.p*10+"%"};
    left:${props=>props.l*10+'%'};
    animation:${aniLoading} .8s ease;
    -webkit-animation:${aniLoading} .8s ease;
    -moz-animation:${aniLoading} .8s ease;
    position:relative;
    padding:10px;
    .sty{
        position:absolute;
        top:10px;
        left:10px;
        width:-webkit-calc( 100% - 20px );
        height:-webkit-calc( 100% - 20px );
        width:-moz-calc( 100% - 20px );
        height:-moz-calc( 100% - 20px );
        width:calc( 100% - 20px );
        height:calc( 100% - 20px );
        box-sizing:border-box;
        padding:10px;
        background:rgba(255,255,255,.45);
        background-clip:content-box;
        -webkit-filter: blur(5px);
    　　-moz-filter: blur(5px);
    　　-ms-filter: blur(5px);
    　　filter: blur(5px);
    }
    .titleSty{
        position:absolute;
        top:10px;
        left:10px;
        width:-webkit-calc( 100% - 20px );
        height:-webkit-calc( 100% - 20px );
        width:-moz-calc( 100% - 20px );
        height:-moz-calc( 100% - 20px )
        width:calc( 100% - 20px );
        height:calc( 100% - 20px );
        box-shadow: 0 0 0 1px hsla(240,0%,100%,.3) inset,
        0 3px 20px 1px rgba(0, 0, 0, 0.3);
        border-radius:10px;
        border:1px solid transparent;
        
    }
   

    
    
`
// 点击图标跳转方块
class RectBack extends React.Component{
    render(){
        const {w,h,p,t,icon,link,style,l}=this.props;
        let path=link ? link:'/';
        return (
            <Root w={w||1} h={h||1} p={p||0} t={t||""} l={l||0} style={style||null} onClick={this.props.onClick}  checked>
                <Link to={path}>
                    <div className='titleSty'>
                        <Icon icon={IconT[icon]}/>
                    </div>
                </Link>
            </Root>
        )
    }

}
//点击内容方块
class RectClick extends React.Component{
    render(){
        const {w,h,p,t,icon,style,l}=this.props;
        return (
            <Root w={w||1} h={h||1} p={p||0} t={t||""} l={l||0} style={style||null}>
                 <div className='titleSty'>
                     <div>
                            {
                                icon?<Icon icon={IconT[icon]}/>:""
                            }
                            {t}
                     </div>
                     
                 </div>
            </Root>
        )
    }
}

// 内容方块
class RectContent extends React.Component{
    render(){
        const {w,h,p,component,style,l}=this.props;
        let Comp=component;
        return (
            <RootC w={w||1} h={h||1} p={p||0} l={l || 0}style={style || null}>
                <div className='sty'></div>
                <div className='titleSty'>
                    <Comp/>
                </div>
            </RootC>
        )
    }
}
export {RectBack,RectContent,RectClick}