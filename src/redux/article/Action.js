import Type from "./Type";

const self={
    //模块选中索引
    articleChangeIndexFun:val=>dispatch=>dispatch({
        type:Type.ARTICLE_CHANGE_INDEX,
        data:val
    }),
}
export default self;