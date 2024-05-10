import { Link, useParams } from 'react-router-dom';
import './details.css';
import { useContext, useEffect, useState } from 'react';
import ProductsContext from '../../context/productsContext';
import upArrow from '../../assets/up-arrow.png';
import downArrow from '../../assets/down-arrow.png';
import addToCartImg from '../../assets/add-to-cart.png';
import AuthContext from '../../context/authContext';

const Details = () => {
    const {session} = useContext(AuthContext)
    const {/*categoryCont,*/ productsByCat, setCartProducts, cartProducts, addToCartContext} = useContext(ProductsContext)

    //const [products,setProducts*/] = useState([]);
    const [details, setDetails] = useState([]);
    const [openPuntuation, setOpenPuntuation] = useState(false);
    const [count, setCount] = useState(1);
    const {/*category,*/ id} = useParams();
    console.log(count)
    useEffect(() => {

        /*fetch(`http://127.0.0.1:8000/getProductsByCategory/${category}`)//fetch(`https://fakestoreapi.com/products/category/${categoryCont}`)
            .then((res) => res.json())
            .then((json) => setProducts(json))*/

        fetch(`http://127.0.0.1:8000/getProductById/${id}`)//fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((json) =>setDetails(json))
    // eslint-disable-next-line react-hooks/exhaustive-deps

        localStorage.setItem('cartInfo', JSON.stringify(cartProducts));
        setCartProducts(JSON.parse(localStorage.getItem('cartInfo')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log('details: ', details)

    const puntuation = (e, productId, rate) => {
        e.preventDefault();
        console.log(productId, " ", rate);
    }

    const addToCart = (e, productId, productCategory, productDescription, productImage, productPrice, productRate, productCount, productTitle) => {
        e.preventDefault();
        const data = {
            userId: session.id,
            productId: productId,
            productCategory: productCategory,
            productDescription: productDescription,
            productImage: productImage,
            productPrice: productPrice,
            productRate: productRate,
            productQuantity: productCount,
            productTitle: productTitle,
        }

        console.log("add: ", data);

        addToCartContext(data);

    }

    return (
        <>
        <div className="details">
            {details.map((d) => 
                <div key={d.id}>
                    <div>
                        <img src={d.image} alt=""></img>
                    </div>
                    <div className='details-info'>
                        <h3>{d.productName}</h3>
                        <h2 className='text-success'>${d.price}</h2>
                        <p>{d.description}</p>
                        <div>
                            <div className='puntuation'>
                                <label>Puntuation: {d.rate}</label>
                                {openPuntuation ? <button onClick={() => setOpenPuntuation(false)}><img src={upArrow} alt=""></img></button> : <button onClick={() => setOpenPuntuation(true)}><img src={downArrow} alt=""></img></button>}
                            </div>
                            <div>
                            {openPuntuation &&
                                <div className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                                    <div className="btn-group btn-rating me-2" role="group" aria-label="First group">
                                        <button type="button" className="btn btn-outline-warning" onClick={() => puntuation(d.id, 1)}>1</button>
                                        <button type="button" className="btn btn-outline-warning" onClick={() => puntuation(d.id, 2)}>2</button>
                                        <button type="button" className="btn btn-outline-warning" onClick={() => puntuation(d.id, 3)}>3</button>
                                        <button type="button" className="btn btn-outline-warning" onClick={() => puntuation(d.id, 4)}>4</button>
                                        <button type="button" className="btn btn-outline-warning" onClick={() => puntuation(d.id, 5)}>5</button>
                                    </div>
                                </div>
                            }
                            </div>
                            <div>
                                <div>
                                    <button type="button" className="" onClick={() => count === 1 ? setCount(1) : setCount(count - 1)}></button>
                                    <label>{count}</label>
                                    <button type="button" className="" onClick={() => count < d.quantity ? setCount(count + 1) : setCount(d.quantity)}></button>
                                </div>    
                                <button className='addCartButton text-bg-warning' onClick={(e) => addToCart(e, d.id, d.category_code_id, d.description, d.image, d.price, d.rate, count, d.productName)}><p>Add </p><img src={addToCartImg} alt=""></img></button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <div className='other-products'>
            <h3>Tambien te puede interesar:</h3>
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
        </>
    );
}

export default Details;