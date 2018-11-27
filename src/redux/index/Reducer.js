import Type from "./Type"
const initialState={
    checkedNum:1,
    path:'/',
}
const getNewState=function(state=initialState,action){
    switch (action.type){
        case Type.CHECKED_NUM:
            return {
                ...state,
                checkedNum:action.data
            }
        case Type.PATH_CHANGE:
            return {
                ...state,
                path:action.data
            }
        default:
            return state   
    }
}
export default getNewState;
