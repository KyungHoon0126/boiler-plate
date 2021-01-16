import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types'

// Reducer :  전 상태(previousState)와 action(무엇이 일어났는지 설명하는 객체)를 통해 nextState로 만드는 것.

export default function (state = {}, action) { // state : 전 상태, state = {} : 현재 상태는 비어있는 상태이다.  
    switch (action.type) {
        // loginUser라는 Action을 parameter로 받아서 그 안의 type에 접근이 가능함.
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload } // spreadoperator? 빈상태, 똑같이 가져온다고 함.  
    
        case REGISTER_USER:
            return { ...state, register: action.payload }

        case AUTH_USER:
            return { ... state, userData: action.payload }

        default:
            return state;
    }
}

// function userReducer (state = {}, action) {
//     switch (action.type) {
//         case LOGIN_USER:
//             return { ...state, loginSuccess: action.payload } // spreadoperator? 빈상태, 똑같이 가져온다고 함.
    
//         default:
//             return state;
//     }
// }

// export default userReducer;