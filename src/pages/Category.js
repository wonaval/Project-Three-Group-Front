import { useState, useEffect } from 'react';
import React from 'react';
import env from 'react-dotenv';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Category.css';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import bakery from './images/bakery.png';
import books from './images/books.png';
import electronics from './images/electronics.png';
import plants from './images/plants.png';

const Category = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div>
      <div>
        <h2>PRODUCT CATEGORIES</h2>
      </div>
      <Carousel responsive={responsive}>
        <div>
          <Link to="/category/bakery">
            <img
              src={bakery}
              alt={'Bakery Category Logo'}
              className="carouselImage"
            />{' '}
          </Link>
        </div>
        <div>
          <Link to="/category/books">
            <img
              src={books}
              alt={'Books  Category Logo'}
              className="carouselImage"
            />{' '}
          </Link>
        </div>
        <div>
          <Link to="/category/electronics">
            <img
              src={electronics}
              alt={'Electronic Category Logo'}
              className="carouselImage"
            />{' '}
          </Link>
        </div>
        <div>
          <Link to="/category/plants">
            <img
              src={plants}
              alt={'Plants  Category Logo'}
              className="carouselImage"
            />{' '}
          </Link>
        </div>
      </Carousel>
    </div>
  );
};

export default Category;
