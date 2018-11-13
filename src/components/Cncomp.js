import React from 'react'
import "@comp/Cncom.css"
import { withTheme } from 'styled-components';
/**
 * 文字提示(组件包裹型)
 * title:提示文字(必填)
 * direction:显示方向（选填）,值:left|right|top|bottom(默认)
 * 
 */
class ToolTip extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShow:false
        }
    }
    onMouseEnter=()=>{
        this.setState({
            isShow:true
        })
    }
    onMouseLeave=()=>{
        this.setState({
            isShow:false
        })
    }
    render(){
        return (
            <div className={`ToopTip ${this.state.isShow?"toolTip-show":"toolTip-hide"}`} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <div className="ToopTip-content">{this.props.children}</div>
                <span className={`toop ToopTip-arrows-${this.props.direction ||'bottom' }`}></span>
                <span className={`toop ToopTip-title ToopTip-direction-${this.props.direction || 'bottom'}`} ref={text=>this.text=text}>{this.props.title}</span>
            </div>
        )
    }
}
/**
 * 详细信息展示框（点击展示）
 * title:标题(选填)
 * direction:显示方向（选填），值：top(默认)|bottom
 * content:内容，值：组件|string,
 * visible:是否显示，布尔值
 * 
 * 
 */
class PromptBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
           
        }
    }
    render(){
        return (
            <div className={`PromptBox`}  ref={box=>this.box=box}>
                {this.props.children}
                <div className={`PromptBox-box-${this.props.direction || "top"}`} hidden={!this.props.visible}>
                {
                    this.props.content
                }
                </div>
            </div>
        )
    }
}
/**
 * 进度滑块（垂直方向）
 * value:当前值，要由父组件值：0-1,默认为0,
 * onClick:点击事件得自己处理
 */
class Range extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.value || 0,
        }
    }
    onClickfun=(e)=>{
        e.stopPropagation();
        this.props.onClick(this.range,e);
    }
    render(){
        const height={
            height:this.props.value*100+'%'
        }
        return (
            <div className='Range'>
                <div className={`Range-ver`} onClick={this.onClickfun} ref={range=>this.range=range}>
                    <span style={height}></span>
                </div>
            </div>
        )
    }
}
/**
 * 抽屉
 * width:抽屉宽度
 * height:抽屉高度
 * align:抽屉位置，值:left | center(默认) | right
 * distance:距离边框的距离
 * position：抽屉的位置
 * content：抽屉的内容
 * onClose：抽屉关闭或取消时，调用的函数
 */
class DrawerBox extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="DrawerBox">
                {this.props.children}
                <div className="DrawerBox-cont">sssss</div>
            </div>
        )
    }
}
export {ToolTip,PromptBox,Range,DrawerBox}