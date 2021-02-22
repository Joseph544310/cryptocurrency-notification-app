import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {login, resetError} from '../actions/auth'
 
const LoginForm: React.FC<any> = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        props.resetError()
    }, [])

    const login = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.login(username, password)
        setUsername('')
        setPassword('')
    }
    
    return (
        <div>
            <form className='form-style' onSubmit={login}>
                <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className='btn btn-primary'>Login</button>
                <p>{props.auth.error}</p>
            </form>
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {login, resetError})(LoginForm)