import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const AuthPage:React.FC = () => {
    const [page, setPage] = useState<'login'|'register'>('login')
    return (
        <div>
            {page==='login'?
            <div>
                <LoginForm/>
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