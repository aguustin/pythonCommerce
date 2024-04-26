import './navigation.css';
import { Link, useNavigate } from 'react-router-dom';
import bag from '../../assets/bag.png';
import menu from '../../assets/menu.png';
import productRelease from '../../assets/product-release.png';
import trend from '../../assets/trend.png';
import logoutImg from '../../assets/log-out.png';
import cartShops from '../../assets/shopping-trolley.png';
import { useContext, useEffect, useState } from 'react';
import Cart from '../cart/cart';
import AuthContext from '../../context/authContext';
import ProductsContext from '../../context/productsContext';
import { getUserCartByIdRequest } from '../api/productsRequest';

const Navigation = () => {
    const navigate = useNavigate();
    const {session, setSession} = useContext(AuthContext);
    const {cartProducts, setCartProducts} = useContext(ProductsContext);
    const [openCart, setOpenCart] = useState();

    const logout = () => {
        localStorage.removeItem('user');
        setSession(null);
        navigate('/');
    }
   
    useEffect(() => {
        // Check if session exists before fetching cart data
        if(session) {
            try{
                const getCartData = async () => {
                    const res = await getUserCartByIdRequest(session.id);
                    setCartProducts(res.data);
                };
                getCartData();
            }catch(err){
                console.log('')
            }
        }
    }, [session, setCartProducts]);

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
                    session.userType == 1 ?
                    <>
                        <img className='openMenu' src={menu} alt=""></img>
                        <div className='menu'>
                            <input type="checkbox" className="openAdminNav" onClick={() => a()} />
                            <div className='slide'>
                                <li><img src={productRelease} alt=""></img><a href="/uploadProductForm">Upload Product</a></li>
                                <li><img src={trend} alt=""></img><a href="/sales">Sales</a></li>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <button className='cartShop' onClick={() => setOpenCart(!openCart)}><img src={cartShops} alt=""></img></button>
                        <button className='logout' onClick={() => logout()}><img src={logoutImg} alt=""></img></button>
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