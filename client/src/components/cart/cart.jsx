import './cart.css';
import trash from '../../assets/recycle-bin.png';
import bag from '../../assets/bag.png';
import { useContext } from 'react';
import ProductsContext from '../../context/productsContext';
import AuthContext from '../../context/authContext';

const Cart = () => {

    const {session} = useContext(AuthContext);
    const {cartProducts, setCartProducts} = useContext(ProductsContext);
    
    return(
        <>
            <div className="cart">
                {cartProducts.map((c) => 
                <div key={c.id} className='product-container'>
                    <div className='product-img-container'><img className='product-img' src={bag} alt=""></img></div>
                    <div>
                        <img className="trash" src={trash} alt=""></img>
                    </div>
                    <div className='product-desc'>
                        <h3>{c.product_code_id.productName}</h3>
                        <h2 className='text-success'>${c.product_code_id.price}</h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                         Eveniet.</p>
                    </div>
                </div>)}
            </div>
        </>
    )
}

export default Cart;