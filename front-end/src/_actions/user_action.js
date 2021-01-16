import Axios from 'axios'
import {
    LOGIN_USER, 
    REGISTER_USER,
    AUTH_USER
} from './types';

// body를 parameter로 받음.
export function loginUser(dataToSubmit) {
    // 서버에서 받은 response.data(데이터)를 request에 저장.
    const request = Axios.post('/api/users/login', dataToSubmit)
                         .then(response => response.data)

    // request를 이제 reducer에 넘겨줘야 한다.
    return {
        type: LOGIN_USER,
        // response
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    const request = Axios.post('/api/users/register', dataToSubmit)
                         .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {
    const request = Axios.get('/api/users/auth')
                         .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}