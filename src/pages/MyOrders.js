import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from 'react'
import axios from "axios"

const MyOrders = () => {
  // useContexts
  const { cartState, productState } = useContext(UserContext)
  const [ products, setProducts ] = productState
  const [ cart, setCart ] = cartState
  
  // useStates
  const [ cartInfo, setCartInfo ] = useState([])

  // useState
  const [ address, setAddress ] = useState('')
  const [ credit, setCredit ] = useState('')

  const checkOut = async (e) => {
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

        // Converts cartState context into productInfo to be displayed
        const itemInfo = async () => {
          try {
              const infoList = cart.map((item)=>{
                return (products.find((product)=>{ return (product.id === item.itemId) }))
              })
              setCartInfo([...infoList])
              console.log(cartInfo)
          } catch (error) {
              console.log(error.message)
          }
        }
  
        useEffect(()=>{
          itemInfo();
        }, [])

  return (
    <div>
      <div>My Orders</div>
      <div>
      </div>
      <div>
        <form onSubmit={checkOut}>
          <label htmlFor='address'>Address:</label>
          <input type='text' placeholder='Enter address...' onChange={(e)=>{setAddress(e.target.value)}}/>
          <label htmlFor='creditCard'>Credit-card:</label>
          <input type='text' placeholder='Enter credit card...' onChange={(e)=>{setCredit(e.target.value)}}/>
          <button>Checkout</button>
        </form>
        <div>
                <button onClick={()=>{}}>Checkout</button>
        </div>
        <div>
        { cartInfo.map((item, i) => {
          return (
              <div className='cartItem' key={i}>
                  { cart[i].checkedOut ?
                    <span>
                      <img src={item.image} alt={item.name} />
                      {item.itemId}
                      {item.name}
                      ${item.price}
                    </span>
                  :
                    null
                  }
              </div>
          )
        })}
        </div>
      </div>
    </div>
  )
}

export default MyOrders