import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'
import CreateAlertForm from './CreateAlertForm'

const HomePage = (props: any) => {
    return (
        <div>
            <h1>HomePage</h1>
            <button onClick={props.logout}>Logout</button>
            <CreateAlertForm/>
        </div>
        
    )
}

export default connect(null, {logout})(HomePage)