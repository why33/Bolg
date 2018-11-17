import Type from "./Type"

const self={
    checkout_num_fun:(num)=>dispatch=>{
        dispatch({
            type:Type.CHECKED_NUM,
            data:num
        })
    },
    path_change_fun:(val)=>dispatch=>dispatch({
        type:Type.PATH_CHANGE,
        data:val
    }),
}
export default self;