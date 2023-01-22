import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/colors.css";
import "./App.css";
import { Home } from "./page/Home";
import { About } from "./page/About";
import { Products } from "./components/Products";
import { Product } from "./components/Product";
import { Cart } from "./page/Cart";
import { LoginPage } from "./page/LoginPage";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/loginpage" element={<LoginPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
