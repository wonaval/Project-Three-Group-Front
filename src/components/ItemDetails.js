import axios from 'axios';
import React from 'react'
import { useState, useEffect, useContext } from  'react'
import { useParams, Link } from 'react-router-dom'
import env from 'react-dotenv'
import './ItemDetails.css'

const ItemDetails = (props) => {
    
    // useParams
    const { id } = useParams();

    // useState
    const [ itemInfo, setItemInfo ] = useState([])

    // Get single item details
    const getDetail = async () => {
        try {
            const detail = await axios.get(`${env.BACKEND_URL}/item/${id}`)
            console.log('Detail', detail.data.item)
            setItemInfo(detail.data.item)
        } catch (error) {
            console.log(error.message)
        }
    }

    // Add item to cart function
    const addToCartClick = async (itemId) => {
        try {
            const response = await axios.post(`${env.BACKEND_URL}/cart`, {id : id}, {
                headers: {
                    Authorization: localStorage.getItem('userId')
                }
            })
            props.getCart();
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getDetail();
    }, [])

    return (
        <div className='main-div'>
            <div >
                <Link to={`/category/${itemInfo.category}`}>
                    Back to {itemInfo.category}
                </Link>
            </div>
            <div className='item-div'>
            <div className='item-header'>
                <h2>{itemInfo.name}</h2>
            </div>
            <div>
                <img src={itemInfo.image}/>
            </div>
            <div>
                {`Description: ${itemInfo.description}`}
            </div>
            <div>
                Price: ${itemInfo.price}
            </div>
            <div>
                <button onClick={addToCartClick}>Add to Cart</button>
            </div>
            </div>
        </div>
    )
}

export default ItemDetails
