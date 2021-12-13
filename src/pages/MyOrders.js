import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from 'react'
import axios from "axios"
import env from 'react-dotenv'

const MyOrders = (props) => {
  // useContexts
  const { cartState, productState } = useContext(UserContext)
  const [ products, setProducts ] = productState
  const [ cart, setCart ] = cartState
  
  // useStates
  const [ cartInfo, setCartInfo ] = useState([])
  const [ uniqueDate, setUniqueDate ] = useState([])


  // Converts cartState context into productInfo to be displayed
  const itemInfo = async () => {
    try {
        const infoList = cart.map((item)=>{
          return (products.find((product)=>{ return (product.id === item.itemId) }))
        })
        await setCartInfo([...infoList])
        console.log(cart)
    } catch (error) {
        console.log(error.message)
    }
  }

  const getCartDate = async () => {


    // referenced: https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript?rq=1
    // const List = cart.map((item) => (
    //   item.checkoutDate
    // )).filter((value, index, self)=>(
    //   self.indexOf(value) === index
    // ))


    // referenced: https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript?rq=1
    const List1 = [...new Set(cart.map(item => item.checkoutDate))]

    console.log(List1)
    setUniqueDate(List1)

  }

  const getOrderDate = (cartDate) => {

    for (let date of uniqueDate){
      if(date === cartDate){
        return date
      }
    }
  }


  useEffect(async ()=>{
    await props.getCart();
    console.log(cart)
    await itemInfo();
    await getCartDate()
  }, [])

  return (
    <div>
      <div>My Previous Orders</div>
        <div>
          {/* {console.log(cart)} */}
        { cartInfo.map((item, i) => {
          return (
              <div className='cartItem' key={i}>
                {console.log(getOrderDate(cart[i].checkoutDate))}
                  { getOrderDate(cart[i].checkoutDate) === cart[i].checkoutDate ?
                    <div>
                      <img src={item.image} alt={item.name} />
                      {cart[i].checkoutDate}
                      {item.name}
                      ${item.price}
                    </div>
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