import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {IconT,ArticleJson0,ArticleJson1,ArticleJson2} from '@type'
import connect from '@connect'


const ArticleJson=[ArticleJson0,ArticleJson1,ArticleJson2];
const Root=styled.div`
    width:100%;
    height:100%;
    padding:20px 5px;
    box-sizing:border-box;
    ul,li{
        padding:0;
        margin:0;
    }
    .articleList{
        width:100%;
        height:100%;
        list-style:none;
        li{
            box-sizing:border-box;
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
        
        li>.divSty{
            width:100%;
            cursor:pointer;
            span{
                display:inline-block;
                vertical-align:middle;
                width:2vh;
                height:3.5vh;
                svg{
                    width:70%
                    height:70%;
                    font-size:1.2vh; 
                    color:#666;
                }
            }
        }
        li>.divSty:hover{
            background:#99c4df;
        }
        li .liChildrenSty{
            width:90%;
            box-sizing:border-box;
            padding-left:5px;
            list-style:none;
            margin:0 auto auto 10px;
            border-left:1px solid #c4c0c7;
        }
    }
   

`
@connect('article')
class ArticleList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    ulMapData=(objs,key)=>{
        let data=objs.map((item,index)=>{
            return (
                <TreeNode obj={item} index={index} key={`${key}-${index}`} {...this.props}>
                    {
                        item.children
                        ?
                        (
                            <ul className='liChildrenSty'>
                                {
                                this.ulMapData(item.children,`0-${index}`) 
                                }
                            </ul>
                        )
                        
                        :null
                    }
                </TreeNode>)
        })
        return data

    }
    render(){
        const { indexArticle }=this.props;
        return (
            <Root>
                <ul className='articleList'>
                    {this.ulMapData(ArticleJson[indexArticle],"0")}
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
    onClickLi=()=>{
        this.setState({
            isFold:!this.state.isFold
        })
        !this.props.children && this.props.articleHtmlContentFun(this.props.obj.url);
    }
    render(){
        const {obj}=this.props;
        return (
            <li>
                <div onClick={this.onClickLi} className='divSty'>
                    <span>{obj.children && <Icon icon={this.state.isFold?IconT['faCaretRight']:IconT['faCaretDown']}/>} </span>
                     {obj.title}
                </div>
                {
                    this.props.children 
                    ?
                    ( <div hidden={this.state.isFold}>
                        {this.props.children}
                    </div>)
                    :''
                }
               
                
            </li>
        )
    }
}
export default ArticleList;