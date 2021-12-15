import React, { useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

const Header = () => {
    const { userState, cartState } = useContext(UserContext)
    const [ user, setUser ] = userState
    const [ cart, setCart ] = cartState
    
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            { user.id ? 
            <>
            <Button href="/category" color="inherit"> Category </Button>
            <Button href="/cart" color="inherit"> My Cart </Button>
            <Button href="/orders" color="inherit"> My Orders </Button>
            <Button href="/" color= "inherit" onClick={() => { setUser({}); setCart([]); 
            localStorage.removeItem('userId') }} >Logout </Button> 
            </>
            :
            <>
            <Button href="/signup" color="inherit"> Sign Up </Button>
            <Button href="/login" color="inherit"> Login </Button>
            </>
            }
            
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default Header