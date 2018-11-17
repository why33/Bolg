import React from 'react'
import svg from '@src/App.svg'
import styled from 'styled-components'
import MusicControl from '@src/modules/music/MusicControl'
import connect from '@connect'
import { BrowserRouter as Router,Route,withRouter} from 'react-router-dom'
import './index.css'
import Main from "./Main"
import Music from '@module/music'


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
            left:-14%;
        }
        p{
            text-indent:1%;
            color:yellow;
            text-shadow:0 0 1px #000;
        }
    }

`
class Content1 extends React.Component{
    render(){
        let path=this.props.match.path;
        let Comp=null;
        switch (path) {
            case "/music":
                Comp=Music;
                break;
            default:
                Comp=Main;
                break;
        }
        return (
           <Comp {...this.props}/>
        )
    }
} 
const Xx=withRouter(Content1)
@connect('index','music') 
class Content extends React.Component{
    componentDidMount(){
        this.props.path_change_fun(window.location.pathname);
    }
    render(){
        return (
           <Root>
               <header>
                    <div  className='logoSty'>
                        <img src={svg} alt="logo"/>
                    </div>
                    <p>.............</p>
               </header>
               <Router>
                    <Route exact path={this.props.path} render={(props)=>(<Xx {...this.props} {...props}/>)}/>
                </Router>
               <MusicControl/>
           </Root>

        )
    }

}

export default Content;