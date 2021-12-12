import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import env from 'react-dotenv'
import axios from 'axios'

const AllProducts = () => {
    const {name} = useParams()

    const [products, setProducts] = useState([])

    const loadProducts = async () => {
        const response = await axios.get(`${env.BACKEND_URL}/item`)
        
        console.log(response)

        setProducts(response.data.items)

        
        console.log(name)
        // setTimeout(()=>{console.log(products)},5000)
    }

    useEffect(()=>{loadProducts()}, [])
    return (
        <div>

            {products.map((item, i) => {

                // {console.log(item.category)}
                {console.log(item.category === name)}
                // "books"
               
                return(
                    <>
                        {item.category === name ?
                        
                    
                            <>
                            
                                <h1>{item.name}</h1>
                                <p>{item.description}</p>
                                <img src={item.image} />
                            
                            </>
                            
                        :


                            null
                    
                    
                    
                        }
                
                    </>

                ) 
            })}
                
                

            
            
        </div>
    )
}

export default AllProducts
