import React, {useState} from 'react'
import Axios from 'axios'
import {RouteComponentProps, useHistory} from 'react-router-dom'
 
interface props extends RouteComponentProps<any> {}

const LoginForm: React.FC<props> = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    const login = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        Axios({
            method: 'POST',
            data: {
                username,
                password
            },
            withCredentials: true,
            url: 'http://localhost:8000/api/auth/login'
        }).then(res => {
            console.log(res)
            // console.log('login successful, redirecting to home page')
            // history.push('/')
        }).catch(err => console.log(err))
        
        setUsername('')
        setPassword('')
    }
    
    return (
        <div>
            <form onSubmit={login}>
                <input type='text' placeholder='email' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginForm