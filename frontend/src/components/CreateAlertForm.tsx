import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getCurrencies} from '../actions/currencies'
import {addAlert} from '../actions/alerts'
import '../css/CreateAlertForm.css'

const CreateAlertForm: React.FC<any> = props => {
    const [currency, setCurrency] = useState('1')
    const [direction, setDirection] = useState<'UP'|'DOWN'>('UP')
    const [type, setType] = useState<'PERCENTAGE'|'FIXED'>('FIXED')
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        props.getCurrencies()
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        props.addAlert(currency, direction, type, amount)
    }

    return (
        <div className='CreateAlertForm'>
            <form onSubmit={handleSubmit}>
                <span>Alert me when
                <select value={currency} onChange={e=>setCurrency(e.target.value)}>
                    {props.currencies.map((currency:any) => 
                        <option key={currency.id} value={currency.id}>{currency.name}</option>
                    )}                   
                </select>
                goes
                <select
                value={direction}
                onChange={e=>{
                    e.target.value==='UP'? setDirection('UP'):setDirection('DOWN')
                }}
                >
                    <option value='UP'>{type==='PERCENTAGE'?'Up By':'Above'}</option>
                    <option value='DOWN'>{type==='PERCENTAGE'?'Down By':'Below'}</option>
                </select>
                <input type='number' placeholder='amount' value={Number(amount).toString()} onChange={e=>setAmount(Number(e.target.value))}/>
                <select
                value={type}
                onChange={e=>{
                    e.target.value==='PERCENTAGE'? setType('PERCENTAGE'):setType('FIXED')
                }}
                >
                    <option value='PERCENTAGE'>%</option>
                    <option value='FIXED'>USD</option>
                </select>
                {type==='PERCENTAGE'? ' in one day': null}
                </span>
                <button className='btn btn-success'>Create Alert</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    currencies: state.currencies.currencies
})
export default connect(mapStateToProps, {getCurrencies, addAlert})(CreateAlertForm)