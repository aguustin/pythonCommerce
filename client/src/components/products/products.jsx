import './products.css';
import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import prueba from '../../assets/load-testing-consultant-4-1024x536.jpeg';
import ProductsContext from '../../context/productsContext';

const Products = () => {

    const {setCategoryCont} = useContext(ProductsContext);
    const [productsByCat, setProductsByCat] = useState([]);
    const {category} = useParams();
    setCategoryCont(category);
    
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res=>res.json())
        .then(json=>setProductsByCat(json));
    },[])


    return(
        <>
            <div className='products'>
                <div>
                    <div className='products-img-principal'>
                        <img src={prueba} alt=""></img>
                    </div>
                    <div className='products-img-secondary'>
                        <img src={prueba} alt=""></img>
                        <img src={prueba} alt=""></img>
                    </div>
                </div>
                <div>
                    <div className='products-img-tertiary'>
                        {
                            productsByCat.map((p) => {
                                return(
                                    <Link to={`/details/${p.id}`} className='goToDetails'>
                                 <div className="card">
                                        <img src={p.image} className="card-img-top" alt=""/>
                                        <div className="card-body">
                                            <h5 className="card-title">{p.title}</h5>
                                            <p className="card-text">{p.description}</p>
                                            <h2>${p.price}</h2>
                                        </div>
                                  </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='footer'>
                
            </div>
        </>
    )
}

export default Products;