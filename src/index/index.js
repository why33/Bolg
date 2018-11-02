import React from 'react'
import svg from '@src/App.svg'
import styled from 'styled-components'
import RectBack from '@comp/RectBack'


const Root=styled.div`
    width:80%;
    height:70vh;
    margin:0 auto;
    display:flex;
    flex-direction:column;
    header{
        width:100%;
        .logoSty{
            width:30%;
            height:100px;
            overflow:hidden;
        }
        img{
            width:100%;
            height:240%;
            position:relative;
            top:-48%;
            left:-15%;
        }
        p{
            text-indent:1%;
            color:yellow;
            text-shadow:0 0 1px #000;
        }
    }
    .mainSty{
        flex-grow:1;
        display:flex;
        flex-wrap:wrap;
        align-content: flex-start;
        justify-content:flex-end;
        width:100%;
        height:0;
        overflow:hidden;
    }



`
export default class Content extends React.Component{
    render(){
        return (
           <Root>
               <header>
                    <div  className='logoSty'>
                        <img src={svg} alt="logo"/>
                    </div>
                    <p>闲的啊啊啊啊啊啊啊</p>
               </header>
               <div className='mainSty'>
                    <RectBack w={2} h={6} p={0} t='music'/>
                    <RectBack w={5} h={3} p={0} t='article'/>
                    <RectBack w={3} h={3} p={0} t='picture'/>
                    <RectBack w={2} h={4} p={0} t='index'/>
                    <RectBack w={5} h={7} p={-3} t='code'/>
                    <RectBack w={3} h={4} p={-3} t='video'/>
                    <RectBack w={3} h={3} p={-6} t='intro'/>


               </div>
           </Root>
        )
    }

}