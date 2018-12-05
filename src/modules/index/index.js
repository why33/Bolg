import React from 'react'
import svg from '@src/App.svg'
import styled from 'styled-components'
import MusicControl from '@src/modules/music/MusicControl'
import connect from '@connect'
import { BrowserRouter as Router,Route,withRouter} from 'react-router-dom'
import './index.css'
import Main from "./Main"
import Article from '@module/article'
import Music from '@module/music'
import Code from '@module/code'
import {DrawerBox,Button} from '@cncomp'
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {IconT} from '@type'


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
const Div=styled.div`
    width:100%;
    box-sizing:border-box;
    padding:1vh 2vh;
    background:#d3e5f1;
    border-radius:0 0 30% 0;
    box-shadow:0 0 0.5vh  gray;
    p{
        color:#666;
        font-weight:bold;
        letter-spacing:0.2vh;
        font-size:1.6vh;
        line-height:3vh;
    }
    div{
        text-align:right;
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
            case "/article":
                Comp=Article;
                break;
            case "/code":
                Comp=Code;
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
const Con=withRouter(Content1);

//提示是否播放音乐组件
class MusicAllow extends React.Component{
    onClickOk=()=>{
        let audio=document.getElementById("audio");
        this.props.isPlayFunction(true);
        audio.play();
        this.props.onChange(false);
    }
    onClickNO=()=>{
        this.props.onChange(false);
    }
    render(){
        return (
            <Div>
                <p>可以播放音乐吗<Icon icon={IconT.faQuestion}/> </p>
                <div>
                     <Button onClick={this.onClickOk}>可以</Button>  
                     <Button type="info"onClick={this.onClickNO}>不可</Button>
                </div>
                             
            </Div>
        )
    }
}
@connect('index','music') 
class Content extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShow:true,//提示播放按钮
        }
    }
    componentDidMount(){
        this.props.path_change_fun(window.location.pathname);
    }
    onChange=(val)=>{
        this.setState({
            isShow:val
        })
    }
    onClose=()=>{
        this.setState({
            isShow:false
        })
    }
    render(){
        return (
           <Root>
               <header>
                    <div  className='logoSty'>
                        <img src={svg} alt="logo"/>
                    </div>
                    <p>闲的。。。</p>
               </header>
               <Router>
                    <Route exact path={this.props.path} render={(props)=>(<Con {...this.props} {...props}/>)}/>
                </Router>
               <MusicControl/>
               <DrawerBox 
                    visible={this.state.isShow} 
                    width="30%"
                    position={{position:'top',sty:{top:'0',left:'35%'}}}
                    content={<MusicAllow {...this.props} onChange={this.onChange}/>}
                    onClose={this.onClose}
                    closeTime={8}
                />
           </Root>

        )
    }

}

export default Content;