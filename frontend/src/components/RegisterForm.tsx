import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {register, resetError} from '../actions/auth'

const RegisterForm: React.FC<any> = props => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confimPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        props.resetError()
    }, [])

    const register = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.register(username, password, email)
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }
    
    return (
        <div>
            <form className='form-style' onSubmit={register}>
                <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type='password' placeholder='confirm password' value={confimPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                {password!==confimPassword?<p>Passwords do not match</p>: null}
                <button className='btn btn-primary' disabled={!password || !username || !email || password!==confimPassword}>Register</button>
                <p>{props.auth.error}</p>
            </form>
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {register, resetError})(RegisterForm)