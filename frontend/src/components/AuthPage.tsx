import React, { useState} from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {Container, Row, Col} from 'react-bootstrap'
import '../css/AuthPage.css'
import '../css/form.css'

const AuthPage:React.FC<any> = (props) => {
    const [page, setPage] = useState<'login'|'register'>('login')

    return (
        <Container className='AuthPage'>
            <Row className='justify-content-center'>
                <Col xs={8} md={6} lg={4}>
                    {props.auth.isAuthenticated? <Redirect to='/'/> : null}
                    {page==='login'?
                    <div>
                        <LoginForm/>
                        <a href='#' onClick={e=>setPage('register')}>Not registered yet? Click Here!</a>
                    </div>
                    :
                    <div>
                        <RegisterForm/>
                        <a href='#' onClick={e=>setPage('login')}>Already Registered? Click Here to Log In!</a>
                    </div>}
                </Col>               
            </Row>      
        </Container>
    )
}

const mapStateToProps = (state:any) => ({
    auth: state.auth
})
export default connect(mapStateToProps)(AuthPage)