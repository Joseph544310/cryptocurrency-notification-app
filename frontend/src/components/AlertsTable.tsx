import React, {useEffect} from 'react'
import {ListGroup, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {getAlerts, deleteAlert} from '../actions/alerts'

const AlertsTable: React.FC<any> = props => {
    useEffect(() => {
        props.getAlerts()
    }, [])

    const getCurrency = (id: string) => {
        const currency = props.currencies.find((currency:any) => currency.id === id)
        return currency.name
    }

    const getDirection = (direction: string, type: string) => {
        if (type === 'FIXED') {
            if (direction === 'UP') return 'above'
            else return 'below'
        }
        else {
            if (direction === 'UP') return 'up by'
            else return 'down by'
        }
    }

    return (
        <div>
            <ListGroup>
                {props.alerts.map((alert:any) => 
                <ListGroup.Item>
                Alert me when {getCurrency(alert.currency)} goes {getDirection(alert.direction, alert.type)} {alert.amount} {alert.type==='FIXED'?'USD':'%'}
                <Button onClick={e=>props.deleteAlert(alert.id)}>Delete</Button>
                </ListGroup.Item>
                )}
                
            </ListGroup>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    alerts: state.alerts.alerts,
    currencies: state.currencies.currencies
})

export default connect(mapStateToProps, {getAlerts, deleteAlert})(AlertsTable)