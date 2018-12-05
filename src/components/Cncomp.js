import React from 'react'
import "@comp/Cncom.css"
import PropTypes from 'prop-types';

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
 * titile:标签名(选填))
 * visible:是否可见（必填）
 * width:抽屉的宽度，默认为100%,
 * position：抽屉的位置(obj)，值：{position:top|right|bottom(默认)|left,sty:{}},position是抽屉放置的地方,sty是放置的位置，由top，right，left，bottom具体决定（css）
 * content：抽屉的内容
 * onClose：抽屉关闭或取消时，调用的函数
 * closeTime:number，定时关闭，几秒后自动关闭(可选)，例如：3，默认不关闭
 */
class DrawerBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            first:false
        }
    }
    componentDidMount(){
        !this.props.visible && this.setState({
            first:true
        })
        if(this.props.closeTime){
            setTimeout(()=>{
                this.props.onClose();
            },this.props.closeTime*1000)
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.visible!==this.props.visible){
            this.setState({
                first:false
            })
        }
        
    }
    onClose=()=>{
       this.props.onClose();
    }
    render(){
        const {position,title,width,visible}=this.props;
        let styleObj=Object.assign({},(position.sty || {bottom:0,left:0}),{width:width||'100%'});
        return (
            <div className="DrawerBox">
                {this.props.children}
                {
                    this.state.first ?(
                        <div className={`DrawerBox-cont ${visible ? ("DrawerBox-animation-"+position.position):("DrawerBox-animation") }`}  style={styleObj}>
                            <header>
                                <div className='DrawerBox-con-header'>
                                    {title || null}<span onClick={this.onClose}>&#215;</span>
                                </div>
                            </header>
                        {this.props.content}
                        </div>
                    ):(
                        <div className={`DrawerBox-cont ${visible ? ("DrawerBox-animation-"+position.position):("DrawerBox_"+position.position+"_false") }`}  style={styleObj}>
                            <header>
                                <div className='DrawerBox-con-header'>
                                    {title || null}<span onClick={this.onClose}>&#215;</span>
                                </div>
                            </header>
                        {this.props.content}
                        </div>
                    )
                }
                
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
 * width，宽度，默认100%；
 * height：高度，默认10vh;
 * onClick：tr的点击是事件，参数默认为data相对应的数据。可以不写
 * 
 */
class Table extends React.Component{
    componentDidMount(){
        this.table.addEventListener('scroll',this.scrollFun)
    }
    //表头固定
    scrollFun=()=>{
        this.head.style.transform=`translateY(${this.table.scrollTop}px)` ;
        this.head.style.position='ansolute';  
        this.head.style.zIndex='1000';
    }
    //表格按钮点击事件
    clickButFun=(index,fun)=>{
        fun(index)
    }
    //tr点击事件
    onClickF=(index)=>{
        if(this.props.onClick){
            this.props.onClick(index);
            this.table.scrollTop='2vh'
        }else{
            return null;
        }
    }
    render(){
        const {heardData,data,buttons,selectedNum,width,height,onClick}=this.props;
        let sty={width:width||"100%",height:height||'10vh'};
        return (
            <div className='Table' ref={table=>this.table=table} style={sty}>
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
                                   <tr key={item.name+"-"+index} className={`Table-body ${selectedNum===index && 'Table-selected'} ${onClick && 'Table-click'}`} onClick={this.onClickF.bind(this,index)}>
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
/**
 * 按钮组件
 * onClick：点击事件
 * type:按钮类型 default(默认)|info|warn
 */
class Button extends React.Component{
    render(){
        const { type,onClick}=this.props;
        return (
            <button className={`Button ButtonType_${type}`} onClick={onClick}>{this.props.children}</button>
        )
    }
}
Button.propTypes={
    type:PropTypes.string,
    onClick:PropTypes.func
}
Button.defaultProps={
    type:'default',
    onClick:()=>{}
}
/**
 * 标签页组件
 * data:array数据 [{title:'xxx',comp:dd,key:1}],key值从1开始
 * onChange:标签页切换事件，参数为key值
 * defaultKey：默认打开，key值为1
 * buttons:额外的按钮，obj：{type:'string',arr:[1,2,3]} type的类型有三种：string(默认)|icon|all
 * onClick:额外按钮点击事件，默认null
 * close:是否显示标签的关闭按钮，默认为false，
 * onClose：关闭按钮的点击事件，默认null，参数为key值
 */
class Tab extends React.Component{
    constructor(props){
        super(props);
        this.state={
            activeKey:this.props.defaultKey
        }
    }
    onChange=(key)=>{
        this.setState({
            activeKey:key
        })
        this.props.onChange(key)
    }
    onClose=(key,e)=>{
        e.stopPropagation();
        this.props.onClose(key);
    }
    mapTab=(data)=>{
        return (
            <React.Fragment>
               {data.map(item=>(
                   <li key={item.key} className={this.state.activeKey===item.key ? 'activeTab':''} onClick={this.onChange.bind(this,item.key)}>{item.title}{this.props.close?<span onClick={this.onClose.bind(this,item.key)}>&times;</span>:null}</li>
               ))}
            </React.Fragment>
        )
        
    }
    mapButtons=(data)=>{
        return (
            <React.Fragment>
                {data.arr.map((item,index)=>(<li key={'icon-'+index}>{item}</li>))}
            </React.Fragment>
        )
    }
    mapCont=(data)=>{
        return (
            <React.Fragment>
               {data.map(item=>(
                   <li key={item.key} className={this.state.activeKey===item.key ? 'activeCont':''}>{item.comp}</li>
               ))}
            </React.Fragment>
        )
    }
    render(){
        const {data,buttons}=this.props;
        const left=-(this.state.activeKey-1)*100+'%';
        const style={
            left,
            width:data.length*100+'%'
        }
        return (
            <div className='Tab'>
                <div className='Tab_header'>
                   <ul>
                       {this.mapTab(data)}
                   </ul>
                   <div className='Tab_buttons'>
                       <ul>
                           {this.mapButtons(buttons)}
                       </ul>
                   </div>
                </div>
                <div className='Tab_content'>
                    <ul style={style}>
                        {this.mapCont(data)}
                    </ul>
                </div>
            </div>
        )
    }
}
Tab.propTypes={
    data:PropTypes.array.isRequired,
    onChange:PropTypes.func,
    defaultKey:PropTypes.number,
    buttons:PropTypes.object,
    onClick:PropTypes.func,
    close:PropTypes.bool,
    onClose:PropTypes.func,
}
Tab.defaultProps={
    data:[{title:'Tab1',comp:'Tab1',key:1},{title:'Tab2',comp:'Tab2',key:2},{title:'Tab3',comp:'Tab3',key:3}],
    onChange:()=>{},
    defaultKey:1,
    buttons:{type:'string',arr:['按钮']},
    onClick:()=>{},
    close:false,
    onClose:()=>{},
}
/**
 * 弹窗组件
 * title：标题
 * content：内容
 * button ：footer中的按钮部分
 * shadowB：背景遮罩，布尔值：true|false(默)
 * type:弹框类型 default|info|warn
 * 
 */
class ModalBox extends React.Component{
    render(){
        const {shadowB}=this.props;
        return(
            <div className={`ModalBox ModalBox_shadow-${shadowB}`}>
                弹窗
            </div>
        )
    }
}
ModalBox.prototypes={
  
};
ModalBox.defaultProps={
    shadowB:true
};
export {ToolTip,PromptBox,Range,DrawerBox,Table,Button,Tab,ModalBox}