import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/navigation';
import Home from './components/home/home';
import Details from './components/details/details';
import { ProductsContextProvider } from './context/productsContext';
import Products from './components/products/products';

function App() {

  return (
    <>
    <ProductsContextProvider>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products/:category" element={<Products/>} />
          <Route path="/details/:id" element={<Details/>} />
        </Routes>
      </BrowserRouter>
    </ProductsContextProvider>
    </>
  )
}

export default App;