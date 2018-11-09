import Type from "./Type"

const self={
    checkout_num_fun:(num)=>dispatch=>{
        dispatch({
            type:Type.CHECKED_NUM,
            data:num
        })
    }
}
export default self;