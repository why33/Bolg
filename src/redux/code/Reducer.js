import ActionType from './Type';

const initialState={
    codeContentHTML:[],//参1：html 参2：js  参3：css
    codeSelectObj:null,
}
const getNewState=function(state=initialState,action){
    switch(action.type){
        case ActionType.GET_CODE_CONTENT_HTML:
            return {
                ...state,
                codeContentHTML:action.data
            }
        case ActionType.GET_CODE_SELECT_OBJ:
            return {
                ...state,
                codeSelectObj:action.data
            }
        default:
            return state
    }
}
export default getNewState;