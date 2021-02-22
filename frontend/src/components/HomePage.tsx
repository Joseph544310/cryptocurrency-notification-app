import React, {useState} from 'react'
import CreateAlertForm from './CreateAlertForm'
import AlertsTable from './AlertsTable'
import {Row, Col, Button} from 'react-bootstrap'
import UserNav from './UserNav'

const HomePage = (props: any) => {
    const [showForm, setShowForm] = useState(false)
    return (
        <div>
            <UserNav/>
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

export default HomePage