import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import env from 'react-dotenv'
import axios from 'axios'

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';

import addToCart from './images/icon.png'

const AllProducts = (props) => {
    const { userState } = useContext(UserContext)
    const [ user, setUser ] = userState
    const {name} = useParams()
    const [products, setProducts] = useState([])


    const loadProducts = async () => {
        const response = await axios.get(`${env.BACKEND_URL}/item`)
        setProducts(response.data.items)
        
    }
    
    const addToCartClick = async (itemId) => {
        const response = await axios.post(`${env.BACKEND_URL}/cart`, {id : itemId}, {
            headers: {
                Authorization: localStorage.getItem('userId')
            }
        })
        props.getCart();
    }

    useEffect(()=>{
        loadProducts()
    }, [])

    return (
        <ImageList sx={{ width: 1050, height: 450 }}>
        <ImageListItem key="Subheader" cols={7}>
        <ListSubheader component="div">{name}</ListSubheader>
        </ImageListItem>
        {products.map((item, i) => (
            <ImageListItem key="item.id">
                <img 
                src={`${item.image}?
                w=248&fit=crop&auto=format`}
                srcSet={`${item.image}?
                w=248&fit=crop&auto=format&dpr=6 6x`}
                alt={item.title}
                loading="lazy"
                />
            <ImageListItemBar
                title={item.name}
                subtitle={item.description}
                actionIcon={
            <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
  >
            <button> <img src={addToCart} onClick={()=>{addToCartClick(item.id)}} /> </button>
            </IconButton>
  
}
/>
            
            </ImageListItem>
        ))}
        </ImageList>
  )
}

export default AllProducts