import Axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'

// hoc

export default function (SpecificComponent, option, adminRoute = null) {

    // option의 종류 : null, true, false
    // null : 아무나 출입이 가능한 페이지, true : 로그인한 유저만 출입이 가능한 페이지, false : 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props) {
        
        const dispatch = useDispatch()
        
        // 페이지가 이동할때 마다, Backend에 Request를 날려서 현재 상태를 파악함.
        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)

                // 로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        props.history.push('/login')
                    }
                } else {
                    // 로그인한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if(option == false) {
                            props.history.push('/')
                        }
                    }     
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}