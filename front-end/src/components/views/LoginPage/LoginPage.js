import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Axios from "axios"
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom'

function LoginPage(props) {
    const dispatch = useDispatch();
    
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // Button Click시 Refresh되는 현상 방지

        let body = {
            email: Email,
            password: Password
        }

        // 여기서 이렇게 해주면 되지만, 이거를 Action에서 처리.
        // Axios.post("/api/users/login", body)
        //      .then(response => {

        //      })


        // dispatch를 이용해서 Action을 취한다.
        // 그런데 그 Action이 loginUser라는 Action이다.
        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    // React에서 페이지 이동시킬 때 이렇게 해준다고 함.
                    props.history.push('/')
                } else {
                    alert('Error!')
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <br />
                
                <button>
                    Login
                </button>
            </form>


        </div>
    )
}

export default withRouter(LoginPage)
