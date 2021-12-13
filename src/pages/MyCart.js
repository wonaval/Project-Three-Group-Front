import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'
import './MyCart.css';

const MyCart = (props) => {

    const { userState, cartState, productState } = useContext(UserContext)
    const [ cart, setCart ] = useState([])
    const [ products, setProducts ] = productState
    const [ cartInfo, setCartInfo ] = useState([])
    const [loading, setLoading] = useState(false);



    useEffect(async ()=>{
        await props.getProducts();
    }, [])

    // GET cart and sets to userState context if username is in localstorage
    const getCart = async () => {
        const userId = localStorage.getItem('userId')
        try {
        if(userId) {
            // GET cart from backend

            setLoading(true)

            const userId = localStorage.getItem('userId')

            const cartResponse = await axios.get(`${env.BACKEND_URL}/cart`,{
                headers: { Authorization: userId }
            })

            const cartList = cartResponse.data.items;

            await setCart(cartList)

            const cross = cartList.map((item)=>{
                return products.find((product)=> product.id === item.itemId)
            })

            await setCartInfo(cross)

            setTimeout(()=>{setLoading(false)}, 2000)
            
        }
        } catch (error) {
            console.log(error.message)
        }
    }

    const removeFromCart = async (itemId) => {
        const userId = localStorage.getItem('userId')
        try{
            const cartResponse = await axios.delete(`${env.BACKEND_URL}/cart/${itemId}`,{
                headers: { Authorization: userId }
            })
            console.log(cartResponse)
            await getCart();
        }
        catch(error){console.log(error)}
        
    }
    

    useEffect(async ()=>{
        await getCart();
    }, [])

    return (
        <div>
            Cart Page
            <div>


                {loading ?
                
                    <><h1>loading...</h1></>
                :

                    <>

                        { cartInfo.map((item, i)=>{
                            return (


                                // console.log(cart[i])

                            // <div>{cart[i].checkedOut}</div>

                            <>
                                {cart[i].checkedOut ?
                                    null
                                :
                                    <div key={i}>
                                        <span><img src={item.image} className='cart-item-imgs' /></span>
                                        <span>{item.name}</span>
                                        <span><button onClick={()=>{
                                            removeFromCart(item.id)
                                        }}>Remove</button></span>
                                    </div>
                                }
                            
                            </>
                                
                            )
                        }) }
                    
                    </>
                   
            
                }


                
            </div>
        </div>
    )
}

export default MyCart
