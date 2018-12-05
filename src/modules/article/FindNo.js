import React from 'react'
import styled from 'styled-components'
import img from '@pub/imgs/404.png'

const RootNOFIND=styled.div`
    width:100%;
    height:100%;
    text-align:center;
    box-sizing:border-box;
    padding-top:25%;
    span{
        display:inline-block;
        font-size:6vh;
        font-family:Fantasy;
        color:#353535;
    }
    img{
        width:8vh;
        height:9vh;
        margin:0 1vh;
    }
    p{  
        color:#9c6735;
        font-weight:bold;
        font-size:2vh;
        text-align:center;
        letter-spacing:1vh;
        margin-top:8vh;
        
    }
`


class NoFindPage extends React.Component{
    render(){
        return (
            <RootNOFIND>
                <span>4</span><img src={img} alt='404'/><span>4</span>
                <p>"该页面不存在" </p>
            </RootNOFIND>
        )
    }
}

export default NoFindPage;