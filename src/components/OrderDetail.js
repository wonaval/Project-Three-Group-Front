import { useState, useContext, useEffect } from 'react'
import { UserContext } from "../context/UserContext"
import { useParams } from 'react-router-dom'

const OrderDetail = () => {
  const { cartState, dateState, productState } = useContext(UserContext)
  const [ products, setProducts ] = productState
  const [ cart, setCart ] = cartState
  const [ uniqueDate, setUniqueDate ] = dateState

  const [ cartInfo, setCartInfo ] = useState([])

  const { id } = useParams()

  const itemInfo = async () => {
    try {
        console.log('PRODUCTS', products)

        const infoList = cart.map((item)=>{
          return (products.find((product)=>{ return (product.id === item.itemId) }))
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

  return (
    <div>
      ORDER DETAIL
      <div>{id}</div>
      <div>{uniqueDate[id]}</div>
      { cart.map((item, i)=>{
        return (
          <div key={i}>
            { item.checkoutDate === uniqueDate[id] && cartInfo.length ?
              <div>
                <span>{cartInfo[i].name}</span>
                <span>{cartInfo[i].description}</span>
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
      <div>Order Total: ${orderTotal()}</div></div>

  )
}

export default OrderDetail;