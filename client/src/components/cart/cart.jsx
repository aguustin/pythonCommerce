import './cart.css';
import trash from '../../assets/recycle-bin.png';
import { useContext, useEffect } from 'react';
import ProductsContext from '../../context/productsContext';

const Cart = () => {
    const {cartProducts, setCartProducts} = useContext(ProductsContext);

    const deleteCartProduct = (e, productId) => {
        e.preventDefault();

        fetch(`http://127.0.0.1:8000/deleteCartProduct/${productId}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            /*body: JSON.stringify({
                id: productId
            })*/
        })
        const newCartProducts = cartProducts.filter((c) => c.id!== productId);
        setCartProducts(newCartProducts);
    }

    const ProductDetails = ({ description, maxLength }) => {
        const truncatedDescription =
          description.length > maxLength
            ? description.substring(0, maxLength) + '...'
            : description;
      
        return <p id="product-details">{truncatedDescription}</p>;
      };

    console.log(cartProducts)
    return(
        <>
            <div className="cart">
                {cartProducts.map((c) => 
                <div key={c.id} className='product-container'>
                    <div className='product-img-container'><img className='product-img' src={c.product_code.image} alt=""></img></div>
                    <div>
                        <button onClick={(e) => deleteCartProduct(e, c.id, c.product_code.id)}><img className="trash" src={trash} alt=""></img></button>
                    </div>
                    <div className='product-desc'>
                        <h3>{c.product_code.productName}</h3>
                        <div className='sales-and-price'>
                            <h2 className='text-success'>X{c.product_code.sales}</h2>
                            <h2 className='text-success'>${c.product_code.price}</h2>
                        </div>
                        <ProductDetails description={c.product_code.description} maxLength={50} />
                    </div>
                </div>)}
                <div>
                    <button className='buy-button'><a href='/buyForm'>Buy</a></button>
                </div>
            </div>
        </>
    )
}

export default Cart;