import { createContext, useState} from "react";
import { addToCartRequest } from "../components/api/productsRequest";

const ProductsContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProductsContextProvider = ({children}) => {

   const [categoryCont, setCategoryCont] = useState([]);

    const addToCartContext = async (data) => {
        const res = await addToCartRequest(data);
        console.log(res.data)
    }
    
    return(
        <ProductsContext.Provider value={{categoryCont, setCategoryCont, addToCartContext}}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext;