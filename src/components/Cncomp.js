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
 * titile:标签名
 * width:抽屉的宽度，默认为100%,
 * position：抽屉的位置(obj)，key值：top|right|bottom|left,默认：{bottom:0,right:0}
 * content：抽屉的内容
 * onClose：抽屉关闭或取消时，调用的函数
 */
class DrawerBox extends React.Component{
    onClose=()=>{
       this.props.onClose();
    }
    render(){
        const {position,title,width,visible}=this.props;
        let styleObj=Object.assign({},(position || {bottom:0,right:0}),{width:width||'100%'});
        return (
            <div className="DrawerBox">
                {this.props.children}
                <div className="DrawerBox-cont" style={styleObj} hidden={!visible|| false}>
                    <header>
                        <div className='DrawerBox-con-header'>
                            {title}<span onClick={this.onClose}>&#215;</span>
                        </div>
                    </header>
                   {this.props.content}
                </div>
            </div>
        )
    }
}
/**
 * 表格
 * heardData:表头对象(arr-obj),必须，格式:[{ key:'name',title:'name',width:'20%'}] key属性必须要,width设置宽度
 * data:数据(array-obj),必须[{value:value...}]
 * buttons:按钮集合[],图标组件的集合,图标组件中属性onClick代表点击事件,图标组件的参数为表格中的tr的索引，从0开始
 * selectedNum:默认选中行的索引，从0开始
 */
class Table extends React.Component{
    componentDidMount(){
        this.table.addEventListener('scroll',this.scrollFun)
    }
    scrollFun=()=>{
        this.head.style.transform=`translateY(${this.table.scrollTop}px` ;
        this.head.style.position='ansolute';  
        this.head.style.zIndex='1000';
    }

    buttonClick=(index,fun,e)=>{
        e.stopPropagation();
        //fun(index);
    }
    clickButFun=(index,fun)=>{
        fun(index)
    }
    render(){
        const {heardData,data,buttons,selectedNum}=this.props;
        return (
            <div className='Table' ref={table=>this.table=table}>
                <table border={0} >
                    <thead  className='Table-thead' ref={head=>this.head=head}>
                        <tr align='left'>
                            {heardData.map(item=>(<th key={item.title} width={item.width||'auto'}>{item.title}</th>))}
                            {buttons && <th></th>}
                        </tr>
                    </thead>
                    <tbody>
                            {data.map((item,index)=>{
                               let arr=[];
                               arr=heardData.map((item1,index1)=>{
                                   return (<td key={index+"-"+index1}>{item[item1.key]}</td>)
                                   
                               })
                               return (
                                   <tr key={item.name+"-"+index} className={`Table-body ${selectedNum===index && 'Table-selected'}`}>
                                     {arr}
                                     {buttons && (<td className="Table-buttons">
                                       {
                                        buttons.map((item2,index2)=>{
                                            return (<span key={index2} onClick={this.clickButFun.bind(this,index,item2.props.onClick)}>{item2}</span>)
                                        }
                                           
                                        )
                                        }
                                        </td>)
                                    }
                                   </tr>
                               )
                            })}
                    </tbody>
                   
                   
                </table>


            </div>
        )
    }
}
export {ToolTip,PromptBox,Range,DrawerBox,Table}