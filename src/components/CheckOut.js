import { useState } from 'react'
import axios from 'axios'
import env from 'react-dotenv'

const CheckOut = () => {
  // useState
  const [ address, setAddress ] = useState('')
  const [ credit, setCredit ] = useState('')

  const submitForm = async (e) => {
    try {
        e.preventDefault()
        const userId = localStorage.getItem('userId')
        const response = await axios.put(`${env.BACKEND_URL}/cart`, {
          headers: {
            Authorization: localStorage.getItem('userId')
          }
        })
        console.log('Checked out!', response)
    } catch (error) {
      console.log(env.BACKEND_URL)
        console.log(error.message)
    }
  }


  return (
    <div>
      <form onSubmit={(e)=>{submitForm(e)}}>
        <label htmlFor='address'>Address:</label>
        <input type='text' placeholder='Enter address...' value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
        <label htmlFor='creditCard'>Credit-card:</label>
        <input type='text' placeholder='Enter credit card...' value={credit} onChange={(e)=>{setCredit(e.target.value)}}/>
        <button>Checkout</button>
      </form>
    </div>
  )
}

export default CheckOut;