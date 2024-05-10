import { createContext, useState} from "react";
import { addToCartRequest, orderRequest } from "../components/api/productsRequest";

const ProductsContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProductsContextProvider = ({children}) => {

   const [products, setProducts] = useState([]);
   const [categoryCont, setCategoryCont] = useState([]);
   const [productsByCat, setProductsByCat] = useState([]);
   const [cartProducts, setCartProducts] = useState([]);

    /*useEffect(() => {
        const res = fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>console.log(json));
        setProducts(res);
    },[])*/

    const addToCartContext = async (data) => {
        const res = await addToCartRequest(data);
        console.log(res.data)
    }

    const orderContext = async () => {
        console.log('orderdddd')
        const serializeCartProducts = JSON.stringify(cartProducts);
        const res = await orderRequest(serializeCartProducts);
        localStorage.setItem('order', JSON.stringify(res.data))
        setCartProducts(null)
        console.log(cartProducts)
    }

    return(
        <ProductsContext.Provider value={{products, setProducts, productsByCat, setProductsByCat, categoryCont, setCategoryCont, cartProducts, setCartProducts, addToCartContext, orderContext}}>
            {children}
        </ProductsContext.Provider>

    )
}

export default ProductsContext;