import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';
import { changeState } from '../page/Store.js'
import {useNavigate} from 'react-router-dom'
import { searchProduct } from '../apiCalls';

export const Navbar = (props) => {
  const [logged, setLogged] = useState(localStorage.getItem('logged'));
   const [query,setQuery]=useState('')
   

   const hendleChange=(e)=>{
    e.preventDefault(); 
  
    setQuery(e.target.value);
   }
  useEffect(() => {
    setLogged(localStorage.getItem('logged') != null ? localStorage.getItem('logged') : false);
  }, []);

  const changeLog = () => {
    changeState('');
    setLogged(null);
  };
  //<img src={process.env.PUBLIC_URL + 'WE SHOES.png'} alt="Shop Now" />
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <h1 className="logo">Shop Now</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/statistics">
                Statistics
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <form className="nav-item search-bar">
              <div className="input-group">
                <input className="form-control"
                  type="text"
                  onChange={hendleChange}
                  placeholder="Checkout our collection.."
                  aria-label="Search"
                />
                <div className="input-group-append">
                <Link to={{pathname:`/products/${query}`}}>
                  <button className="btn btn-outline-secondary" type="submit">
                    <i className="fas fa-search">Search</i>
                  </button>
                  </Link>
                </div>
              </div>
            </form>
            
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <div className="item-with-name-and-icon">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  Cart
                </div>
              </Link>
            </li>
            <li className="nav-item">
              {logged ? <Link className="nav-link" to="/" onClick={()=>changeLog()}>
                <div className="item-with-name-and-icon">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Logout
                </div>
              </Link> : <Link className="nav-link" to="/signup">
                <div className="item-with-name-and-icon">
                  <FontAwesomeIcon icon={faSignInAlt} />
                  Signup
                </div>
              </Link>
            }
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
