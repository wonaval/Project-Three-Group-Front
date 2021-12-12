import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Header = () => {
    const { userState } = useContext(UserContext)
    const [ user, setUser ] = userState

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

                    <li>
                        <Link
                            to="/cart">
                            My Cart
                        </Link>
                    </li>

                    <li>

                        <span 

                        onClick={()=>{
                            localStorage.removeItem('userId')
                            setUser({})}}
                        >Logout</span>

                    </li>


                    <li>
                        <Link
                            to="/signup">
                            Sign Up
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/login">
                            login
                        </Link>
                    </li>


                </>


            </ul>
        </div>
    )
}

export default Header
