
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import './App.css';
import Product from './components/Product';
import AllProductsScreen from './screens/AllproductsScreen';
import HomeScreen from './screens/HomeScreen';


function App() {
  return (
    <div >
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<AllProductsScreen />} />
    <Route path="/product" element={<Product/>} />
    <Route path="/" element={<AllProductsScreen />} />
    <Route path="/" element={<AllProductsScreen />} />
    <Route path="/" element={<AllProductsScreen />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
