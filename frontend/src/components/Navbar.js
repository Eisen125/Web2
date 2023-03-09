import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';

export const Navbar = () => {
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
                  type="search"
                  placeholder="Checkout our collection.."
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="submit">
                    <i className="fas fa-search">Search</i>
                  </button>
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
              <Link className="nav-link" to="/signup">
                <div className="item-with-name-and-icon">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Signup
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
