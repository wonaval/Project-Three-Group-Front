import React, { useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Header = (props) => {
    const { userState, cartState } = useContext(UserContext)
    const [ user, setUser ] = userState
    const [ cart, setCart ] = cartState


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
                { user.id ?
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
                            <Link to='/'
                            onClick={()=>{
                                setUser({})
                                setCart([])
                                localStorage.removeItem('userId')
                            }}
                            >Logout</Link>
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