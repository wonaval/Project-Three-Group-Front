import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'

const MyCart = (props) => {
    const { userState, cartState, productState } = useContext(UserContext)
    const [products] = productState
    const [cart, setCart] = useState([])
    const [cartInfo, setCartInfo] = useState([])

    // GET cart and sets to userState context if username is in localstorage
    const getCart = async () => {
        const userId = localStorage.getItem('userId')
        try {
            if (userId) {
                // GET cart from backend
                const userId = localStorage.getItem('userId')
                
                const cartResponse = await axios.get(`${env.BACKEND_URL}/cart`, {
                    headers: { Authorization: userId }
                })
                console.log('Cart Response', cartResponse)

                await setCart( cartResponse.data.carts.map((item)=>{ return ({
                    'id' : item.id,
                    'userId' : item.userId,
                    'itemId' : item.itemId,
                    'checkedOutDate' : item.checkedOutDate,
                    'checkedOut' : item.checkedOut
                })}), ...cart )

                await setCartInfo( cart.map((item) => {
                    return products.find((product) => product.id === item.itemId)
                }), ...cartInfo)
                
                console.log(cart)
                console.log(cartInfo)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getCart();
    }, [])

    const removeItem = async (itemId) => {
        try {
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
                                {console.log(cart[i])}
                                <img src={item.image} style={{ width: "100px" }} alt={item.name} />
                                {item.name}
                                <button onClick={(event)=>{removeItem(event.target.value)}} value={item.itemId}>Remove</button>

                            </span>
                        </div>
                    )
                })}
                <button>Checkout</button>
            </div>
        </div>
    )
}

export default MyCart
