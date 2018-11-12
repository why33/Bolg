import React from 'react'
import "@comp/Cncom.css"
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
 * 详细信息展示框
 * title:标题(选填)
 * direction:显示方向（选填），值：top(默认)|bottom
 * content:内容，值：组件|string,
 * distance:距离（选填）
 * 
 */
class PromptBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShow:false
        }
    }
    render(){
        return (
            <div className={`PromptBox`}>
                {this.props.children}
                <div className={`PromptBox-box-${this.props.direction || "top"}`}>
                {
                    this.props.content
                }
                </div>
            </div>
        )
    }

}
/**
 * 进度滑块
 * align:排类方式，放置方式。值：hor(水平)|ver(垂直，默认)
 * value:当前值，值：0-1,默认为0,
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
        console.log(111,e,e.clientY,e.currentTarget.offsetY)
        
    }
    render(){
        const height={
            height:this.props.value*100+'%'
        }
        return (
            <div className='Range'>
                <div className={`Range-${this.props.align||"ver"}`} onClick={this.onClickfun}>
                    <span style={height}></span>
                </div>
            </div>
        )
    }
}

export {ToolTip,PromptBox,Range}