import React, {useEffect} from 'react'
import {ListGroup, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {getAlerts, deleteAlert} from '../actions/alerts'
import {getCurrencies} from '../actions/currencies'
import {FaTrash} from 'react-icons/fa'
import '../css/AlertsTable.css'

const AlertsTable: React.FC<any> = props => {
    useEffect(() => {
        props.getAlerts()
        props.getCurrencies()
    }, [])

    const getCurrency = (id: string) => {
        const currency = props.currencies.find((currency:any) => currency.id === id)
        if (currency) return currency.name
        else return ''
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
                <ListGroup.Item key={alert.id}>
                Alert me when {getCurrency(alert.currency)} goes {getDirection(alert.direction, alert.type)} {alert.amount} {alert.type==='FIXED'?'USD':'%'}
                <span className='trash'><FaTrash onClick={e=>props.deleteAlert(alert.id)}/></span>
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

export default connect(mapStateToProps, {getAlerts, deleteAlert, getCurrencies})(AlertsTable)