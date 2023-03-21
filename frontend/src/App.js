import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./styles/colors.css";
import "./App.css";
import { Home } from "./page/Home";
import { Statistics } from "./page/Statistics";
import { Products } from "./components/Products";
import { Product } from "./components/Product";
import { Cart } from "./page/Cart";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Login } from "./page/Login";
import { Signup } from "./page/Signup";



function App() {
 
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:query" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
