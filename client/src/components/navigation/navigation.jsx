import './navigation.css';
import { Link } from 'react-router-dom';
import bag from '../../assets/bag.png';
import cartShops from '../../assets/shopping-trolley.png';
import { useState } from 'react';
import Cart from '../cart/cart';

const Navigation = () => {

    const [openCart, setOpenCart] = useState(false);

    return(
        <>
            <div className="navigation">
                <div  className='bagImg'>
                    <img src={bag} alt=""></img>
                    <h3>Tienda Online</h3>
                </div>
                <div className='navigation-ul'>
                    <Link to="/" className='navHome'>Home</Link>
                    <div className="btn-group">
                        <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Categories
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                            <li><a className="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                    </div>
                </div>
                <div className="input-group bootstrapInput">
                    <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
                <button className='cartShop'><img src={cartShops} alt=""></img></button>
                <Cart/>
            </div>
        </>
    )
}

export default Navigation;