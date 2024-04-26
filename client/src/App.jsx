import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/navigation';
import Home from './components/home/home';
import Details from './components/details/details';
import { ProductsContextProvider } from './context/productsContext';
import Products from './components/products/products';
import UserForm from './components/userForm/userForm';
import { AuthContextProvider } from './context/authContext';
import BuyForm from './components/buyForm/buyForm';
import UploadProduct from './components/uploadProduct/uploadProduct';

function App() {

  return (
    <>
    <BrowserRouter>
      <AuthContextProvider>
      <ProductsContextProvider>
          <Navigation/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/products/:category" element={<Products/>} />
            <Route path="/details/:id" element={<Details/>} />
            <Route path="/account/:change" element={<UserForm/>} />
            <Route path="/buyForm" element={<BuyForm/>}/>
            <Route path="/uploadProductForm" element={<UploadProduct/>}/>
          </Routes>
      </ProductsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
    </>
  )
}

export default App;