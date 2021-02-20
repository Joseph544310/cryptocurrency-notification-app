import React, {useState} from 'react'
import Axios from 'axios'
import {RouteComponentProps} from 'react-router-dom'
 
interface props extends RouteComponentProps<any> {}

const LoginForm: React.FC<props> = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        Axios({
            method: 'POST',
            data: {
                email,
                password
            },
            withCredentials: true,
            url: 'http://localhost:8000/api/auth/login'
        }).then(res => {
            console.log(res)
            props.history.push('/')
        }).catch(err => console.log(err))
        
        setEmail('')
        setPassword('')
    }
    
    return (
        <div>
            <form onSubmit={login}>
                <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginForm