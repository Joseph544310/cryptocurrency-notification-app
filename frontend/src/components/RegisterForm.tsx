import React, {useState} from 'react'
import Axios from 'axios'

const RegisterForm: React.FC = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confimPassword, setConfirmPassword] = useState('')

    const register = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        Axios({
            method: 'POST',
            data: {
                email,
                password
            },
            withCredentials: true,
            url: 'http://localhost:8000/api/users/'
        }).then(res => console.log(res)).catch(err => console.log(err))
        
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }
    
    return (
        <div>
            <form onSubmit={register}>
                <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type='password' placeholder='confirm password' value={confimPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                {password!==confimPassword?<p>Passwords do not match</p>: null}
                <button disabled={!password || password!==confimPassword}>Login</button>
            </form>
        </div>
    )
}

export default RegisterForm