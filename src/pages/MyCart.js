import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'

const MyCart = (props) => {
    const { userState, cartState, productState } = useContext(UserContext)
    const [ cart, setCart ] = useState([])
    const [ products, setProducts ] = productState
    const [ cartInfo, setCartInfo ] = useState([])

    // GET cart and sets to userState context if username is in localstorage
    const getCart = async () => {
        const userId = localStorage.getItem('userId')
        try {
        if(userId) {
            // GET cart from backend
            const userId = localStorage.getItem('userId')
            const cartResponse = await axios.get(`${env.BACKEND_URL}/cart`,{
                headers: { Authorization: userId }
            })
            const cartList = cartResponse.data.items;
            setCart(cartList)
            const cross = cartList.map((item)=>{
                return products.find((product)=> product.id === item.itemId)
            })
            setCartInfo(cross)
        }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getCart();
    }, [])

    return (
        <div>
            Cart Page
            <div>
                { cartInfo.map((item, i)=>{
                    return (
                    <div>{cart[i].checkedOut}</div>
                        // { cart[i].checkedOut ?
                        // null
                        // :
                        // <div key={i}>
                        //     <span>{item.name}</span>
                        //     <span><button>Remove</button></span>
                        // </div>
                        // }
                    )
                }) }
            </div>
        </div>
    )
}

export default MyCart
