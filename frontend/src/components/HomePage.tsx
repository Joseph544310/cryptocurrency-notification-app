import React, {useState} from 'react'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'
import CreateAlertForm from './CreateAlertForm'
import AlertsTable from './AlertsTable'
import {Row, Col, Button} from 'react-bootstrap'

const HomePage = (props: any) => {
    const [showForm, setShowForm] = useState(false)
    return (
        <div>
            <h1>HomePage</h1>
            <button onClick={props.logout}>Logout</button>
            {showForm?<CreateAlertForm/>:null}
            {showForm?
            <Button onClick={e=>setShowForm(false)}>Cancel</Button>:
            <Button onClick={e=>setShowForm(true)}>Add Alert</Button>}
            <Row className='justify-content-center'>
                <Col xs={8} md={6}>
                    <AlertsTable/>
                </Col>
            </Row>
            
            
        </div>
        
    )
}

export default connect(null, {logout})(HomePage)