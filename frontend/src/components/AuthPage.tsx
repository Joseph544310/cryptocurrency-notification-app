import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import {RouteComponentProps} from 'react-router-dom'
 
interface props extends RouteComponentProps<any> {}

const AuthPage:React.FC<props> = (props) => {
    const [page, setPage] = useState<'login'|'register'>('login')
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