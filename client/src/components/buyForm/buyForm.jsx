import './buyForm.css'
import { useContext, useState } from 'react';
import ProductsContext from '../../context/productsContext';
import { useNavigate } from 'react-router-dom';
import bag from '../../assets/bag.png';

const BuyForm = () => {
    const navigate = useNavigate()
    const {cartProducts, orderContext} = useContext(ProductsContext);
    const [ownerName, setOwnerName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvc, setCvc] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [address, setAddress] = useState('');
    const [addressNumber, setAddressNumber] = useState();
    const [enabledButton, setEnabledButton] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update individual state variables based on input name
        switch (name) {
            case 'ownerName':
                setOwnerName(value);
                break;
            case 'cardNumber':
                setCardNumber(value);
                break;
            case 'cvc':
                setCvc(value);
                break;
            case 'expirationDate':
                setExpirationDate(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'addressNumber':
                setAddressNumber(value);
                break;
            default:
                break;
        }
        if ( ownerName.length > 3 && cardNumber.length === 16 && cvc.length === 3 && expirationDate.length > 0 && address.length > 0 && addressNumber.length > 0) {
            setEnabledButton(true);
        } else {
            setEnabledButton(false);
        }
    }

    const order = async (e) => {
        e.preventDefault();
        await orderContext();
        navigate('/')
    }

    return(
        <div>

            <form className="buyForm" onSubmit={(e) =>  order(e)}>
                <div>
                    <div className='buyForm-group'>
                        <label className=''>Name of owner</label>
                        <input type="text" className="form-control" placeholder="" name="ownerName" onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label className=''>Card Number</label>
                        <input type="number" className="form-control" placeholder="Email" name="cardNumber" onChange={handleInputChange}/>
                    </div>
                    <div className='buyForm-group'>
                        <label className=''>CVC</label>
                        <input type="number" className="form-control" name="cvc" onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label className=''>Expiration Date</label>
                        <input type="date" className="form-control" name="expirationDate" onChange={handleInputChange}/>
                    </div>
                    <div className='buyForm-group'>
                        <label className=''>Adress</label>
                        <input type="text" className="form-control" name="address" onChange={handleInputChange}/>
                    </div>
                    <div className='buyForm-group'>
                        <label className=''>Adress Number</label>
                        <input type="number" className="form-control" name="addressNumber" onChange={handleInputChange}/>
                    </div>
                </div>
                <div>
                    {cartProducts.map((cart) =>
                            <div key={cart.id}>
                                <img src={cart.product_code.image} alt=""></img>
                                <div>
                                    <h3>{cart.product_code.productName}</h3>
                                    <p>{cart.product_code.category_code.category}</p>
                                    <label>Price: ${cart.product_code.price}</label>
                                    <label>Quantity: {cart.product_code.quantity}</label>
                                </div>
                            </div>
                    )} 
                    <button type="submit" className="" disabled={!enabledButton}>Order</button>
                </div>
            </form>
        </div>
    )
}

export default BuyForm;