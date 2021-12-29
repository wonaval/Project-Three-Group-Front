import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import LoginIcon from '@mui/icons-material/Login';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';

import './Header.css';
import logo from './images/jwl-logo.png';

const Header = (props) => {
  const { userState } = useContext(UserContext);
  const [user, setUser] = userState;

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
            href="/"
          >
            <span className="logo">
              <img src={logo} className="logo" />
              JEWEL
            </span>
          </IconButton>
          <Button href="/category" color="inherit">
            <CategoryIcon />
            <span className="nav-text">Category</span>
          </Button>
          {user.id ? (
            <>
              <Button href="/cart" color="inherit">
                <ShoppingCartIcon />
                <span className="nav-text">My Cart</span>
              </Button>
              <Button href="/orders" color="inherit">
                <PaidIcon />
                <span className="nav-text">My Orders</span>
              </Button>
              <Button
                href="/login"
                color="inherit"
                onClick={() => {
                  setUser({});
                  props.setCart([]);
                  localStorage.removeItem('userId');
                }}
              >
                <LogoutIcon />
                <span className="nav-text">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button href="/signup" color="inherit">
                <GroupAddIcon />
                <span className="nav-text">Sign Up</span>
              </Button>
              <Button href="/login" color="inherit">
                <LoginIcon />
                <span className="nav-text">Login</span>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
