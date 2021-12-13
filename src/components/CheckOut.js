import { useState, useContext } from 'react'
import { UserContext } from "../context/UserContext"
import axios from 'axios'
import env from 'react-dotenv'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const CheckOut = () => {

  // useContext
  const { cartState } = useContext(UserContext)
  const [ cart, setCart ] = cartState


  // useState
  const [ address, setAddress ] = useState('')
  const [ credit, setCredit ] = useState('')

  const navigate = useNavigate()

  const submitForm = async (e) => {
    try {
      e.preventDefault()
      const userId = localStorage.getItem('userId')
      console.log(userId)
      const response = await axios.post(`${env.BACKEND_URL}/cart/update`, 
        { id: userId }
      )
      console.log('Checked out!', response.data.carts)

      // setCart([...cart, response.data.carts])
      // console.log(cart)

      navigate('/orders')

    } catch (error) {
      

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
        <input type='submit'/>
      </form>
    </div>
  )
}

export default CheckOut;