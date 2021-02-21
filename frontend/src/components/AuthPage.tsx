import React, { useState, useEffect } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import {RouteComponentProps} from 'react-router-dom'
import Axios from 'axios'
 
interface props extends RouteComponentProps<any> {}

const AuthPage:React.FC<props> = (props) => {
    const [page, setPage] = useState<'login'|'register'>('login')

    // useEffect(() => {
    //     Axios({
    //         method: 'GET',
    //         withCredentials: true,
    //         url: 'http://localhost:8000/api/auth/user'
    //     }).then(res => {
    //         console.log(res)
    //         if (res.data.user){
    //             console.log(res.data.user)
    //             props.history.push('/')
    //         } 
    //     })
    // }, [])

    return (
        <div>
            {page==='login'?
            <div>
                <LoginForm {...props}/>
                <a href='#register' onClick={e=>setPage('register')}>Not registered yet? Click Here!</a>
            </div>
            :
            <div>
                <RegisterForm/>
                <a href='#login' onClick={e=>setPage('login')}>Already Registered? Click Here to Log In!</a>
            </div>}
        </div>
    )
}

export default AuthPage