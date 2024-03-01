import { Link, useParams } from 'react-router-dom';
import './details.css';
import { useContext, useEffect, useState } from 'react';
import ProductsContext from '../../context/productsContext';
import upArrow from '../../assets/up-arrow.png';
import downArrow from '../../assets/down-arrow.png';

const Details = () => {

    const {categoryCont} = useContext(ProductsContext);
    const [products, setProducts] = useState([]);
    const [details, setDetails] = useState([]);
    const [openPuntuation, setOpenPuntuation] = useState(false);
    const {id} = useParams();
    console.log(categoryCont);
    useEffect(() => {

        fetch(`https://fakestoreapi.com/products/category/${categoryCont}`)
            .then((res) => res.json())
            .then((json) => setProducts(json))

        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((json) =>setDetails([json]))
    }, [])

    console.log("products:", products);
    console.log(details);

    const puntuation = () => {

    }

    return (
        <>
        <div className="details">
            {details.map((d) => 
                <>
                    <div>
                        <img src={d.image} alt=""></img>
                    </div>
                    <div className='details-info'>
                        <h3>{d.title}</h3>
                        <h2 className='text-success'>${d.price}</h2>
                        <p>{d.description}</p>
                        <div>
                            <div className='puntuation'>
                                <label>Puntuation: {d.rating.rate}</label>
                                {openPuntuation ? <button onClick={() => setOpenPuntuation(false)}><img src={upArrow} alt=""></img></button> : <button onClick={() => setOpenPuntuation(true)}><img src={downArrow} alt=""></img></button>}
                            </div>
                            <div>
                            {openPuntuation &&
                                <div className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                                    <div className="btn-group btn-rating me-2" role="group" aria-label="First group">
                                        <button type="button" className="btn btn-outline-warning">1</button>
                                        <button type="button" className="btn btn-outline-warning">2</button>
                                        <button type="button" className="btn btn-outline-warning">3</button>
                                        <button type="button" className="btn btn-outline-warning">4</button>
                                        <button type="button" className="btn btn-outline-warning">5</button>
                                    </div>
                                </div>
                            }
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
        <div className='other-products'>
            <h3>Tambien te puede interesar:</h3>
            <div className='products-img-tertiary'>
                {
                    products.map((p) => {
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
        </>
    );
}

export default Details;