import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {IconT,ArticleJson} from '@type'

const Root=styled.div`
    width:100%;
    height:100%;
    padding:20px 0;
    box-sizing:border-box;
    .articleList{
        width:100%;
        height:100%;
        border:1px solid;
        list-style:none;
        li{
            box-sizing:border-box;
            padding-left:2vh;
        }
        &>li{
            width:100%;
            font-size:1.8vh;
            min-height:4vh;
            line-height:4vh;
            padding-left:0.5vh;
            border-sizing:border-box;
            border-bottom:1px solid #c4c0c7;
        }
        
        li>div{
            width:100%;
            cursor:pointer;
            span{
                display:inline-block;
                vertical-align:middle;
                width:2vh;
                height:3vh;
                margin-right:5px;   
                svg{
                    width:100%
                    height:100%;
                    font-size:1.5vh; 
                    
                    color:#666; 
                     
                }

            }
           
         
        }
        li>.liChildrenSty{
            list-style:none;
        }
    }

`

class ArticleList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    ulMapData=()=>{
        let data=ArticleJson.map((item,index)=>{
            return (<TreeNode obj={item} index={index} key={`0-${index}`}>{
                item.children?this.ulMapData(item.children):""
            }</TreeNode>)
        })
        return data

    }
    render(){
        return (
            <Root>
                <ul className='articleList'>
                    {this.ulMapData()}
                </ul>
            </Root>
        )
    }
}
class TreeNode extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isFold:true,//是否折叠
        }
    }
    // onClickLi=()=>{
    //     this.setState({
    //         isFold:!this.state.isFold
    //     })
    // }
    render(){
        const {obj,index,keys}=this.props;
        return (
            <li>
                <div onClick={this.onClickLi}>
                    <span>{obj.children && <Icon icon={this.state.isFold?IconT['faCaretRight']:IconT['faCaretDown']}/>} </span>
                     {obj.title}
                </div>
               
            </li>
        )
    }
}
export default ArticleList;