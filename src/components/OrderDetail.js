import { useState, useContext, useEffect } from 'react'
import { UserContext } from "../context/UserContext"
import { useParams } from 'react-router-dom'

const OrderDetail = (props) => {
  const { cartState, dateState } = useContext(UserContext)
  const [ uniqueDate, setUniqueDate ] = dateState

  const { id } = useParams()

  // useState
  const [ cart, setCart ] = useState([])
  const [ cartInfo, setCartInfo ] = useState([])

  const itemInfo = async () => {
    try {
        console.log('PRODUCTS', props.products)

        const infoList = cart.map((item)=>{
          return (props.products.find((product)=>{ return (product.id === item.itemId) }))
        })

        await setCartInfo([...infoList])
        console.log('CARTINFO', cartInfo)
        console.log('CART', cart)
    } catch (error) {
        console.log(error.message)
    }
  }

  useEffect(()=>{
    itemInfo();
    orderTotal();
  }, [])

  const orderTotal = () => {
    let sum = 0;
    
    cart.map((item, i) => {
      if(item.checkoutDate === uniqueDate[id] && cartInfo.length) {
        sum = sum + cartInfo[i].price
      }
    })
    return sum;
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



  return (
    <div>
      ORDER DETAIL
      <div>{id}</div>
      <div>{uniqueDate[id]}</div>
      <div>
        <span>Address: {address()}</span>
        <span>Credit Card: {credit()}</span>
      </div>
      { cart.map((item, i)=>{
        
        return (
          <div key={i}>
            { item.checkoutDate === uniqueDate[id] && cartInfo.length ?
              <div>
                <span>{cartInfo[i].name}</span>
                <img src={cartInfo[i].image} alt={cartInfo[i].name }/>
                <span>${cartInfo[i].price}</span>
              </div>
              :
              null
            }
          </div>
        )
      })
      }
      <div>Order Total: ${orderTotal()}</div>
    </div>
  )
}

export default OrderDetail;