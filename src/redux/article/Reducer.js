import Type from './Type'

const initialState={
    indexArticle:0,//选中的模块的索引
    htmlContent:null,//选中的内容显示
    itemArticleSelect:null,//菜单中选中项
   
}
const getNewState=function(state=initialState,action){
    switch (action.type){
        case Type.ARTICLE_CHANGE_INDEX:
            return {
                ...state,
                indexArticle:action.data
            }
        case Type.ARTICLE_HTML_CONTENT:
            return {
                ...state,
                htmlContent:action.data
            }
        case Type.ARTICLE_ITEM_SELECT:
            return {
                ...state,
                itemArticleSelect:action.data
            }
        default:
            return state   
    }
}
export default getNewState
