import './buyForm.css'
import { useContext } from 'react';
import ProductsContext from '../../context/productsContext';
import { useNavigate } from 'react-router-dom';

const BuyForm = () => {

    const {cartProducts, orderContext} = useContext(ProductsContext);
    const navigate = useNavigate();
    console.log(cartProducts)
    const order = async (e) => {
        e.preventDefault();
        await orderContext();
        navigate('/')
    }

    return(
        <div className='buyForm-container'>
            <form className="buyForm" onSubmit={(e) =>  order(e)}>
                <div className='fill-data'>
                    <div className='buyForm-group'>
                        <label className=''>Name of owner</label>
                        <input type="text" className="form-control" placeholder="" name="ownerName" />
                    </div>
                    <div className='buyForm-group'>
                        <label className=''>Card Number</label>
                        <input type="text" className="form-control" name="cardNumber" pattern="\d*" maxlength="16" />
                    </div>
                    <div className='buyForm-group'>
                        <label className=''>CVC</label>
                        <input type="text" className="form-control" name="cvc" pattern="\d*" maxlength="3" />
                    </div>
                    <div className='buyForm-group'>
                        <label className=''>Expiration Date</label>
                        <input type="date" className="form-control" name="expirationDate" />
                    </div>
                    <div className='buyForm-group'>
                        <label className=''>Adress</label>
                        <input type="text" className="form-control" name="address" />
                    </div>
                    <div className='buyForm-group'>
                        <label className=''>Adress Number</label>
                        <input type="number" className="form-control" name="addressNumber" />
                    </div>
                </div>
                <div className='product-to-buy-container'>
                    {cartProducts.map((cart) => 
                    <div className='product-to-buy' key={cart.id}>
                        <img src={cart.product_code.image} alt=""></img>
                        <div>
                            <h3>{cart.product_code.productName}</h3>
                            <p>{cart.product_code.category_code.category}</p>
                            <div>
                                <label>{cart.product_code.price}</label>
                                <label>x</label>
                                <label>{cart.product_code.sales}</label>
                            </div>
                        </div>
                    </div>)}
                </div>
                <button type="submit" className="">Order</button>
            </form>
        </div>
    )
}

export default BuyForm;