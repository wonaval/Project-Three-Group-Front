import React, { useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Header = (props) => {
    const { userState, cartState } = useContext(UserContext)
    const [ user, setUser ] = userState
    const [ setCart ] = cartState


    return (
        <div>
            <ul className='nav-bar'>
                <>
                    <li>
                        <Link
                            to="/category">
                            Category
                        </Link>
                    </li>
                { user ?
                    <>
                        <li>
                            <Link
                                to="/cart">
                                My Cart
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/orders">
                                My Orders
                            </Link>
                        </li>

                        <li>
                            <span 
                            onClick={()=>{
                                localStorage.removeItem('userId')
                                setUser({})
                                setCart([])
                            }}
                            >Logout</span>
                        </li>
                    </>
                :
                    <>
                        <li>
                            <Link
                                to="/signup">
                                Sign Up
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/login">
                                Login
                            </Link>
                        </li>
                    </>
                }
            </>
            </ul>
        </div>
    )
}

export default Header
