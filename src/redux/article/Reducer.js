import Type from './Type'

const initialState={
    indexArticle:0,//选中的模块的索引
   
}
const getNewState=function(state=initialState,action){
    switch (action.type){
        case Type.ARTICLE_CHANGE_INDEX:
            return {
                ...state,
                indexArticle:action.data
            }
        default:
            return state   
    }
}
export default getNewState
