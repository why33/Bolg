import React from 'react'
import svg from '@src/App.svg'
import styled from 'styled-components'

const Root=styled.div`
    width:80%;
    height:70%;
    border:1px solid red;
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
        width:100%;
        border:1px solid black;
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

               </div>
           </Root>
        )
    }

}