import ActionType from './Type';
import axios from "axios";
import showdown from 'showdown'

export default {
    //列表中选中的对象
    codeSelectObjFun:obj=>dispatch=>{
        dispatch({
            type:ActionType.GET_CODE_SELECT_OBJ,
            data:obj
        })
    },
    //获取选中页面代码
    getCodeContentHTMLFun:url=>dispatch=>{
        axios.get(url)
            .then(data=>{
                let style=data.data.split('style>')[1] && data.data.split('style>')[1].slice(0,-2);
                let body=data.data.split('body>')[1].slice(0,-2);
                let startIndex=body.indexOf("<script>");
                let endStart=body.lastIndexOf('</script>');
                body=body.split('');
                body.splice(startIndex,endStart-startIndex+9);
                let bodyNew=body.join("");
                let script=data.data.split('script>')[1] && data.data.split('script>')[1].slice(0,-2);
                dispatch({
                    type:ActionType.GET_CODE_CONTENT_HTML,
                    data:[bodyNew,script,style]
                })
            })
            .catch(()=>{
                alert('请求失败')
            })
    }
}