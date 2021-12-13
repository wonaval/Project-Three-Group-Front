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
      <div>My Previous Orders</div>
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
  )
}

export default MyOrders