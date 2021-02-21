import React, { useState} from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'

const AuthPage:React.FC<any> = (props) => {
    const [page, setPage] = useState<'login'|'register'>('login')

    return (
        <div>
            {props.auth.isAuthenticated? <Redirect to='/'/> : null}
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

const mapStateToProps = (state:any) => ({
    auth: state.auth
})
export default connect(mapStateToProps)(AuthPage)