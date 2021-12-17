import { useState, useContext, useEffect } from 'react'
import { UserContext } from "../context/UserContext"
import { useParams } from 'react-router-dom'

import axios from 'axios'
import env from 'react-dotenv'

const OrderDetail = (props) => {
  const { userState, dateState } = useContext(UserContext)
  const [ user, setUser ] = userState
  const [ uniqueDate, setUniqueDate ] = dateState

  const { id } = useParams()

  // useState
  const [ cart, setCart ] = useState([])
  const [ cartInfo, setCartInfo ] = useState([])
  const [ subtotal, setSubtotal] = useState([])

    // Get cart from backend
    const getCart = () => {
      const userId = localStorage.getItem('userId')
      try {
          // GET cart from backend
          axios.get(`${env.BACKEND_URL}/cart`,{
              headers: { Authorization: userId }
          }).then((cartResponse)=>{setCart([...cartResponse.data.items])})

      } catch (error) {
          console.log(error.message)
      }
  }

  // Converts cart context into productInfo to be displayed
  const itemInfo = async () => {
      // Filters list so only checked out items are left
      console.log(uniqueDate[id])
      const checkedList = await cart.filter((item)=>{return(item.checkoutDate === uniqueDate[id])})
      console.log('checked', checkedList)

      const infoList = await checkedList.map((item)=>{
          return (props.products.find((product)=>{ return (product.id === item.itemId) }))
      })
      await setCartInfo([...infoList])
      console.log('CART', cartInfo)
  }

  const orderTotal = () => {
    let sum = 0;
    
    cartInfo.map((item, i) => {
        sum = sum + item.price
      })
    setSubtotal(sum)
  }

  const address = () => {
    const address = [...new Set(cart.map(item => {
      if  (item.checkoutDate === uniqueDate[id] && cartInfo.length)
      { return item.address }
    }))]

    return address;
  }

  const credit = () => {
    const creditCard = [...new Set(cart.map(item => {
      if  (item.checkoutDate === uniqueDate[id] && cartInfo.length)
      { return item.creditCard }
    }))]

    return creditCard
  }

  useEffect(()=>{
    getCart()
  }, [])

  useEffect(()=>{
    itemInfo()
  }, [cart])

  useEffect(()=> {
    orderTotal()
  }, [itemInfo])

  return (
    <div>
      ORDER DETAIL
      <div>{id}</div>
      <div>{uniqueDate[id]}</div>
      <div>
        <span>Address: {address()}</span>
        <span>Credit Card: {credit()}</span>
      </div>
      { cartInfo.map((item, i)=>{
        
        return (
          <div key={i}>
              <div>
                <span>{cartInfo[i].name}</span>
                <img src={cartInfo[i].image} alt={cartInfo[i].name }/>
                <span>${cartInfo[i].price}</span>
              </div>
          </div>
        )
      })
      }
      <div>Order Total: ${subtotal}</div>
    </div>
  )
}

export default OrderDetail;