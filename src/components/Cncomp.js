import React from 'react'
import "@comp/Cncom.css"


/**
 * 文字提示(组件包裹型)
 * title:提示文字
 * direction:显示方向,值:none|left|right|top|bottom
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
                <span className={`toop ToopTip-arrows-${this.props.direction}`}></span>
                <span className={`toop ToopTip-title ToopTip-direction-${this.props.direction}`} ref={text=>this.text=text}>{this.props.title}</span>
            </div>
        )
    }
}
export {ToolTip}