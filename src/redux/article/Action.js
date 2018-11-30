import Type from "./Type";
import axios from 'axios';
import showdown from 'showdown' 

const self={
    //模块选中索引
    articleChangeIndexFun:val=>dispatch=>dispatch({
        type:Type.ARTICLE_CHANGE_INDEX,
        data:val
    }),
    //选中菜单的内容获取
    articleHtmlContentFun:val=>dispatch=>{
        axios.get(val)
            .then((data)=>{
               let converter=new showdown.Converter();
               let html=converter.makeHtml(data.data);
               dispatch({
                  type:Type.ARTICLE_HTML_CONTENT,
                  data:html
               })
            })
            .catch(()=>{
                dispatch({
                    type:Type.ARTICLE_HTML_CONTENT,
                    data:"404"
                })
            })
    },
}
export default self;