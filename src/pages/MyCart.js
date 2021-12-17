import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'
import CheckOut from '../components/CheckOut'
import './MyCart.css';
import LoadingScreen from '../components/LoadingScreen'

const MyCart = (props) => {
    // useContexts
    const { loadingState } = useContext(UserContext)
    const [ loading, setLoading ] = loadingState
    
    // useStates
    const [ cart, setCart] = useState([])
    const [ checkList, setCheckList ] = useState([])
    const [ cartInfo, setCartInfo ] = useState([])
    const [ subtotal, setSubtotal ] = useState(0)

    // Get cart from backend
    const getCart = () => {
        setLoading(true)
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
        // Filters list so only non-checked out items are left
        const checkedList = await cart.filter((item)=>{return(item.checkedOut !== true)})
        setCheckList([...checkedList])

        const infoList = await checkList.map((item)=>{
            return (props.products.find((product)=>{ return (product.id === item.itemId) }))
        })
        await setCartInfo([...infoList])
        setTimeout(()=>{setLoading(false)}, 2000)

    }

    // Removes item from backend
    const removeItem = async (itemId) => {
        try {
            console.log('ItemId', itemId)
            const userId = localStorage.getItem('userId');
            const remove = await axios.delete(`${env.BACKEND_URL}/cart/${itemId}`, {
                headers: { Authorization: userId }
            })
            getCart();
        } catch (error) {
            console.log(error.message)
        }
    }

    const orderTotal = () => {
        let sum = 0;
        cartInfo.map((item, i) => {
            sum = sum + item.price
        })
        setSubtotal(sum)
    }

    useEffect(()=>{
        getCart();
    }, [])

    useEffect(()=>{
        itemInfo();
    }, [cart])

    useEffect(()=>{
        orderTotal();
    }, [cartInfo])

    if (!cartInfo) {
        return (<></>)
    }

    return (
        <>
            { loading ?
                <LoadingScreen />
            :
                <div>
                    <div>
                        <div>Cart Page</div>
                            <div>


                                { cartInfo.map((item, i) => {
                                    console.log(item)
                                    return (
                                        <div className='cartItem' key={i}>
                                                <span>
                                                    <img src={item.image} alt={item.name} />
                                                    {item.name}
                                                    ${item.price}
                                                    <button onClick={()=>{ removeItem(cart[i].id) }} > Remove </button>
                                                </span>
                                        </div>
                                )})}

                            </div>
                    </div>
                    <div><CheckOut subtotal={subtotal}/></div>

                    </div>
            }
        </>
    )
}

export default MyCart
