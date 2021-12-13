import { useState } from 'react'
import axios from 'axios'

const CheckOut = () => {
  // useState
  const [ address, setAddress ] = useState('')
  const [ credit, setCredit ] = useState('')

  const submitForm = async (e) => {
    try {
        const userId = localStorage.getItem('userId')
        e.preventDefault()
        await axios.put('/cart', {
        headers : { Authorization : userId }
        })
        console.log('Checked out!')
    } catch (error) {
        console.log(error.message)
    }
  }


  return (
    <div>
      <form onSubmit={submitForm}>
        <label htmlFor='address'>Address:</label>
        <input type='text' placeholder='Enter address...' onChange={(e)=>{setAddress(e.target.value)}}/>
        <label htmlFor='creditCard'>Credit-card:</label>
        <input type='text' placeholder='Enter credit card...' onChange={(e)=>{setCredit(e.target.value)}}/>
        <button>Checkout</button>
      </form>
    </div>
  )
}

export default CheckOut;