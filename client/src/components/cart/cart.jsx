import './cart.css';
import trash from '../../assets/recycle-bin.png';
import bag from '../../assets/bag.png';

const Cart = () => {

    return(
        <>
            <div className="cart">
                <div className='product-container'>
                    <img className='product-img' src={bag} alt=""></img>
                    <div>
                        <img  className="trash" src={trash} alt=""></img>
                    </div>
                    <div className='product-desc'>
                        <h3>Titulo del producto</h3>
                        <h2 className='text-success'>$20.31</h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                         Eveniet.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;