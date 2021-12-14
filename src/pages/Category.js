import { useState, useEffect } from 'react'
import React from 'react'
import env from 'react-dotenv'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Logo from './images/logo.png'
import Logo2 from './images/logo2.png'
import Logo3 from './images/logo3.png'
import Logo4 from './images/logo4.png'

const Category = () => {

    // const [items, setItems] = useState({})

    // const loadItems = async () => {
    //     const response = await axios.get(`${env.BACKEND_URL}/item`)

    //     const items = response.data.items

    //     for(let item of items){
    //         console.log(item.category)
    //     }

    //     // console.log(items)
    // }

    // useEffect(()=>{loadItems()}, [])
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      },
    }
    return (
      <Carousel responsive={responsive}>
      <div>
        <Link to="/category/bakery"> <img src={Logo} alt={"logo"} className='carouselImage'/> </Link>
      </div>
      <div>
      <Link to="/category/books"> <img src={Logo4} alt={"logo"} className='carouselImage'/> </Link>
      </div>
      <div>
        <Link to="/category/electronics"> <img src={Logo2} alt={"logo"} className='carouselImage'/> </Link>
      </div>
      <div>
        <Link to="/category/plants"> <img src={Logo3} alt={"logo"} className='carouselImage'/> </Link>
      </div>
    </Carousel>
    )
}

export default Category
