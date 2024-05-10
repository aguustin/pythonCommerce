import './products.css';
import { useContext, useEffect/*, useState*/ } from 'react';
import { useParams, Link } from "react-router-dom";
import prueba from '../../assets/load-testing-consultant-4-1024x536.jpeg';
import ProductsContext from '../../context/productsContext';

const Products = () => {

    const {productsByCat, setProductsByCat, setCategoryCont} = useContext(ProductsContext);
    //const [productsByCat, setProductsByCat] = useState([]);
    const {category} = useParams();
    setCategoryCont(category);
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/getProductsByCategory/${category}`)// fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res=>res.json())
        .then(json=>setProductsByCat(json));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    console.log("prodscat: ", productsByCat)
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
                                const cloudinaryImg = `https://res.cloudinary.com/drmcrdf4r/image/upload/v1715038215/${p.image}`
                                return(
                                <Link key={p.id} to={`/details/${p.id}`} className='goToDetails'>
                                 <div className="card">
                                 <img src={cloudinaryImg} className="card-img-top" alt=""
                                    onError={(e) => {
                                        e.target.onerror = null; // To avoid infinite loop
                                        e.target.src = p.image; // Use the original image source
                                    }}
                                />
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