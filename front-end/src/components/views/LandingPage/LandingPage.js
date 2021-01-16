import React, { useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

function LandingPage(props) {
    useEffect(() => {
        axios.get('/api/hello')
             .then(response => console.log(response.data))
    }, [])

    const onClickHandler = (event) => {
        axios.get('/api/users/logout')
             .then(response => {
                 if (response.data.success) {
                     // history가 react-router-dom을 이용해서 쓰고 있음. 그래서 아래의 withRouter를 써줘야 history를 사용할 수 있다.
                     props.history.push("/login")
                 } else {
                     alert('로그아웃 하는데 실패하였습니다.')
                 }
             })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default withRouter(LandingPage)
