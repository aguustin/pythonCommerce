import './navigation.css';
import { Link, useNavigate } from 'react-router-dom';
import bag from '../../assets/bag.png';
import cartShops from '../../assets/shopping-trolley.png';
import { useContext, useState } from 'react';
import Cart from '../cart/cart';
import AuthContext from '../../context/authContext';

const Navigation = () => {
    const navigate = useNavigate();
    const {session, setSession} = useContext(AuthContext);
    const [openCart, setOpenCart] = useState();

    const logout = () => {
        localStorage.removeItem('user');
        setSession(null);
        navigate('/');
    }

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
                {session 
                    ?
                    <>
                        <button className='cartShop' onClick={() => setOpenCart(!openCart)}><img src={cartShops} alt=""></img></button>
                        <button onClick={() => logout()}>Logout</button>
                    </>
                    :
                    <div className='account'>
                        <a href="/account/getIn">Get in</a>
                        <a href="/account/signIn">Sign In</a> 
                    </div>
                    
                }
                {openCart && <Cart/>}
              
            </div>
        </>
    )
}

export default Navigation;