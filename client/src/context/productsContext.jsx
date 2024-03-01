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
    
    return(
        <ProductsContext.Provider value={{categoryCont, setCategoryCont}}>{children}</ProductsContext.Provider>
    )
}

export default ProductsContext;