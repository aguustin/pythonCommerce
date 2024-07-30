
import { useContext, useEffect } from 'react';
import './home.css';
import prueba from '../../assets/load-testing-consultant-4-1024x536.jpeg';
import {Link} from "react-router-dom";
import ProductsContext from '../../context/productsContext';
import { fillDatabaseRequest } from '../api/productsRequest';

const Home = () => {

    const {products, setProducts} = useContext(ProductsContext)

    useEffect(() => {
        fetch('http://127.0.0.1:8000/getAllProducts/') //  fetch('https://fakestoreapi.com/products 'http://127.0.0.1:8000/getAllProducts/'')
        .then(res=>res.json())
        .then(json=>setProducts(json));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(products);

    /*useEffect(() => {
        if(products.length > 0){
            fillDatabaseRequest(products)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])*/
    
    return(
        <>
            <div className="home">
                  <>
                    <div className='principal-img'>
                        <Link to="/products/ourProducts"><img src={prueba} alt=""></img></Link>
                    </div>
                    <div className='secondary-img'>
                        <Link className="select-category" to="/products/men's clothing"><img src={prueba} alt=""></img></Link>
                        <Link className="select-category" to="/products/jewerely"><img src={prueba} alt=""></img></Link>
                        <Link className="select-category" to="/products/electronics"><img src={prueba} alt=""></img></Link>
                        <Link className="select-category" to="/products/women's clothing"><img src={prueba} alt=""></img></Link>
                    </div>
                 </>
            </div>
        </>
    );
}

export default Home;
