
import { useEffect, useState } from 'react';
import './home.css';
import prueba from '../../assets/load-testing-consultant-4-1024x536.jpeg';
import {Link} from "react-router-dom";

const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>setProducts(json));
    },[])
    console.log(products);
    return(
        <>
            <div className="home">
                  <>
                    <div className='principal-img'>
                        <Link to="/products"><img src={prueba} alt=""></img></Link>
                    </div>
                    <div className='secondary-img'>
                        <Link to="/products/men's clothing"><img src={prueba} alt=""></img></Link>
                        <Link to="/products/jewerely"><img src={prueba} alt=""></img></Link>
                        <Link to="/products/electronics"><img src={prueba} alt=""></img></Link>
                        <Link to="/products/women's clothing"><img src={prueba} alt=""></img></Link>
                    </div>
                 </>
            </div>
        </>
    );
}

export default Home;
