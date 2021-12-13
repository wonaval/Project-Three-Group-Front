import { UserContext } from "../context/UserContext"
import { useContext } from 'react'

const MyOrders = () => {
  const { cartState } = useContext(UserContext)
  const [ cart, setCart ] = cartState

  return (
    <div>
      <div>My Orders</div>
      <div>
      </div>
      <div>
        <form>
          <label for='address'>Address:</label>
          <input type='text' placeholder='Enter address...'/>
          <label form='creditCard'>Credit-card:</label>
          <input type='text' placeholder='Enter credit card...'/>
          <button>Checkout</button>
        </form>
      </div>
    </div>
  )
}

export default MyOrders