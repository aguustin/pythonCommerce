import './buyForm.css'
import { useContext } from 'react';
import ProductsContext from '../../context/productsContext';
import bag from '../../assets/bag.png';

const BuyForm = () => {

    const {cartProducts, orderContext} = useContext(ProductsContext);

    const order = (e) => {
        e.preventDefault();
        orderContext();
    }

    return(
        <div>

            <form className="buyForm" onSubmit={(e) =>  order(e)}>
                <div>
                    <div className='buyForm-group'>
                        <label className=''>Name of owner</label>
                        <input type="text" className="form-control" placeholder="" name="ownerName" />
                    </div>
                    <div>
                        <label className=''>Card Number</label>
                        <input type="number" className="form-control" placeholder="Email" name="cardNumber" />
                    </div>
                    <div className='buyForm-group'>
                        <label className=''>CVC</label>
                        <input type="number" className="form-control" name="cvc" />
                    </div>
                    <div>
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
                <div>
                    {cartProducts.map((cart) => 
                    <div key={cart.id}>
                        <img src={bag} alt=""></img>
                        <div>
                            <h3>Product title</h3>
                            <p>Product category</p>
                            <label>Price: $295.90</label>
                        </div>
                    </div>)}
                    <button type="submit" className="">Order</button>
                </div>
            </form>
        </div>
    )
}

export default BuyForm;