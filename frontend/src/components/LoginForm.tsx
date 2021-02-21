import React, {useState} from 'react'
import {connect} from 'react-redux'
import {login} from '../actions/auth'
 
const LoginForm: React.FC<any> = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.login(username, password)
        setUsername('')
        setPassword('')
    }
    
    return (
        <div>
            <form onSubmit={login}>
                <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default connect(null, {login})(LoginForm)