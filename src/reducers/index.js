import { combineReducers } from 'redux'
let arr = []
export function queryDispatch(state, action) {
    switch (action.type) {
        case 'TAKE_QUERY':
            let counter = 0
            arr.forEach((item) =>
                item === action.query ? counter++ : ""
            );

            if (counter === 0) {
                arr.push(action.query)
            }
            return { val: arr }

        default:
            return { val: arr };
    }
}
const rootReducer = combineReducers({ queryDispatch })

export default rootReducer