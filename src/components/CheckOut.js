import { useState, useContext } from 'react'
import { UserContext } from "../context/UserContext"
import axios from 'axios'
import env from 'react-dotenv'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const CheckOut = (props) => {

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
        { id: userId,
          credit: credit,
          address: address
        }
      )

      console.log('Checked out!', response.data.carts)
      await setCart([...cart, response.data.carts])
      // console.log(cart)

      setTimeout(()=>{navigate('/orders')}, 5000) 
    } catch (error) {
      
        console.log(error.message)
    }
  }

  const orderTotal = () => {
    let sum = 0;
    
    cart.map((item, i) => {
      if(item.checkedOut === false && cart.length) {
        sum = sum + props.cartInfo[i].price
      }
    })
    return sum;
  }


  return (
    <div>
      <div>SUBTOTAL: ${orderTotal()}</div>
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