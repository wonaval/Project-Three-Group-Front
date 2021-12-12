import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
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

                        <span>Logout</span>

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
