import { createContext, useState, useEffect } from "react";

const ProductsContext = createContext();

export const ProductsContextProvider = ({children}) => {

   const [categoryCont, setCategoryCont] = useState([]);

    /*useEffect(() => {
        const res = fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>console.log(json));
        setProducts(res);
    },[])*/

    const addToCartContext = async (data) => {
        const res = addToCartRequest(data);
    }
    
    return(
        <ProductsContext.Provider value={{categoryCont, setCategoryCont, addToCartContext}}>{children}</ProductsContext.Provider>
    )
}

export default ProductsContext;