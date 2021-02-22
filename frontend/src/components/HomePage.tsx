import React, {useState} from 'react'
import CreateAlertForm from './CreateAlertForm'
import AlertsTable from './AlertsTable'
import {Row, Col, Button, Jumbotron} from 'react-bootstrap'
import {FcPlus} from 'react-icons/fc'
import {ImCancelCircle} from 'react-icons/im'
import UserNav from './UserNav'

const HomePage = (props: any) => {
    const [showForm, setShowForm] = useState(false)
    return (
        <div>
            <UserNav/>
            <div className='Header'>
                <h1>Notifications Center</h1>
                <div>
                    <h4>Create alerts to get notified about the price fluctuations</h4>
                    <p>Prices will be automatically checked once per day and you will receive an email when your criterias are met.</p>
                </div>
            </div>
            
            {showForm?<CreateAlertForm/>:null}
            {showForm?
            <ImCancelCircle className='cross-icon' onClick={e=>setShowForm(false)}/>:
            <FcPlus className='plus-icon' onClick={e=>setShowForm(true)}/>}
            <Row className='justify-content-center'>
                <Col xs={8} md={6}>
                    <AlertsTable/>
                </Col>
            </Row>
            
            
        </div>
        
    )
}

export default HomePage