import './cart.css';
import trash from '../../assets/recycle-bin.png';
import bag from '../../assets/bag.png';
import { useContext } from 'react';
import ProductsContext from '../../context/productsContext';
import AuthContext from '../../context/authContext';

const Cart = () => {

    const {session} = useContext(AuthContext);
    const {cartProducts} = useContext(ProductsContext);
    
    return(
        <>
            <div className="cart">
                {cartProducts.map((c) => 
                <div key={c.id} className='product-container'>
                    <div className='product-img-container'><img className='product-img' src={c.product_code.image} alt=""></img></div>
                    <div>
                        <img className="trash" src={trash} alt=""></img>
                    </div>
                    <div className='product-desc'>
                        <h3>{c.product_code.productName}</h3>
                        <h2 className='text-success'>${c.product_code.price}</h2>
                        <p>{c.product_code.description}</p>
                    </div>
                </div>)}
                <div>
                    <button onClick={() => a}></button>
                </div>
            </div>
        </>
    )
}

export default Cart;