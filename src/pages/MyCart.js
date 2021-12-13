import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'

const MyCart = (props) => {
    const { userState, cartState, productState } = useContext(UserContext)
    const [ products, setProducts ] = productState
    const [ cart, setCart ] = cartState
    const [ cartList, setCartList ] = useState([])
    const [ cartInfo, setCartInfo] = useState([])



    const removeItem = async (itemId) => {
        try {
            console.log(itemId)
            const userId = localStorage.getItem('userId');
            const remove = await axios.delete(`${env.BACKEND_URL}/cart/${itemId}`, {
            headers: { Authorization: userId}})
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            Cart Page
            <div>
                {cartInfo.map((item, i) => {
                    return (
                        <div className='cartItem'>
                            <span key={i}>
                                <img src={item.image} style={{ width: "100px" }} alt={item.name} />
                                {item.itemId}
                                {item.name}
                                ${item.price}
                                <button onClick={(event)=>{removeItem(event.target.value)}}>Remove</button>

                            </span>
                        </div>
                    )
                })}
                <button onClick={()=>{}}>Checkout</button>
            </div>
        </div>
    )
}

export default MyCart
