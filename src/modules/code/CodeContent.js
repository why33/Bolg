import React from 'react'
import styled from 'styled-components'
import { Tab,ToolTip,DrawerBox } from '@cncomp';
import { FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {IconT} from '@type'
import CodeWorking from './CodeWorking'
import connect from '@connect'

const Root=styled.div`
    width:100%;
    height:100%;
    box-sizing:border-box;
    padding:10px;
    & .DrawerBox-cont{
       background:rgba(166,118,72,1);
       border-radius:5px;
       box-shadow:0vh 0 2vh 0.2vh grey;
       .DrawerBox-con-header{
           color:#fff;
           font-size:1.8vh;
           border-bottom:0;
       }
    }
    & .Tab_content{
        pre{
            width:auto;
            font-size:2vh;
            font-weight:bolder;
            color:#724a27;

        }
    }
`


@connect('code')
class CodeContent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            hidden:true,//是否隐藏运行按钮
            key:1
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.codeSelectObj!== this.props.codeSelectObj){
            this.setState({
                hidden:nextProps.codeSelectObj.url?false:true,
                key:1
            })
        }
    }
    //运行代码
    onbutClick=()=>{ 
       if(this.props.codeSelectObj.url){
           this.setState({
                visible:!this.state.visible,
            })
       }
        // ele=null;//解除引用，即不再使用的变量设置为null,圾回收机制会将此段内存块回收释放
    }
    onClose=()=>{
        this.setState({
            visible:false
        })
    }
    render(){
        // 第一个为html，第二个为javascript，第三个为css
        const button0={
            type:'icon',
            arr:[]
        }
        const buttons={
            type:'icon',
            arr:[(<ToolTip title='运行代码' direction='right'><Icon icon={IconT['faShareSquare']} onClick={this.onbutClick.bind(this)}/></ToolTip>)]
        }
        const Title=['HTML','javaScript','CSS'];
        let data=this.props.codeContentHTML.map((item,index)=>{
            let newDiv=(<div><pre>{item||'空空如也...'}</pre></div>)
            return {
                title:Title[index],
                comp:newDiv,
                key:index+1
            }
        })
        return (
            <Root>
                <Tab buttons={this.state.hidden?button0:buttons} data={data} defaultKey={this.state.key}/>
                {
                    this.state.visible && (
                        <DrawerBox 
                            content={<CodeWorking {...this.props}/>}
                            title="运行结果" 
                            width='40%'
                            visible={this.state.visible}
                            position={{position:'right',sty:{top:'12%',right:'0%'}}}
                            onClose={this.onClose.bind(this)}
                        />
                    )
                }
                
            </Root>
        )
    }
}
export default CodeContent;