import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'

const MyCart = () => {
    const { userState, cartState } = useContext(UserContext)
    const [ cart, setCart ] = cartState


    useEffect(()=>{
        // loadProducts()
    }, [])

    // Cross Reference cartState against All Products Returns Product Info
    // const loadProducts = async () => {
    //     try {

    //         console.log(productList)
    //         const cartList = await cart.map((item)=>{
    //             return productList.find((product)=> product.id === item.itemId)
    //         })
    //         await setCartInfo(cartList)

    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    return (
        <div>
            Cart Page
            <div>
                {/* {cartInfo.map((item, i)=>{
                    return (
                        <div key={i}>{item.name}</div>
                    )
                })} */}
            </div>
        </div>
    )
}

export default MyCart
