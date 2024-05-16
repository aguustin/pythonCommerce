import { createContext, useState} from "react";
import { addToCartRequest, orderRequest } from "../components/api/productsRequest";

const ProductsContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProductsContextProvider = ({children}) => {

   const [products, setProducts] = useState([]);
   const [categoryCont, setCategoryCont] = useState([]);
   const [productsByCat, setProductsByCat] = useState([]);
   const [cartProducts, setCartProducts] = useState([]);
   const [visibleForm, setVisibleForm] = useState(false)
   const [updateForm, setUpdateForm] = useState()
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

    const handleProductNameContext = async (name) => {
        setUpdateForm([{ ...updateForm[0], productName: name }]);
    }
    const handleProductDescriptionContext = async (description) => {
        setUpdateForm([{ ...updateForm[0], description: description }]);
    }
    const handleProductPriceContext = async (price) => {
        setUpdateForm([{ ...updateForm[0], price: price }]);
    }
    const handleProductQuantityContext = async (quantity) => {
        setUpdateForm([{ ...updateForm[0], quantity: quantity }]);
    }
    const handleProductCategoryContext = async (category) => {
        setUpdateForm([{...updateForm[0], category_code_id: category }]);
    }

    return(
        <ProductsContext.Provider value={{products, setProducts, productsByCat, setProductsByCat, categoryCont, setCategoryCont, cartProducts, setCartProducts, visibleForm, setVisibleForm, updateForm, setUpdateForm, addToCartContext, orderContext, handleProductNameContext, handleProductDescriptionContext, handleProductPriceContext, handleProductQuantityContext, handleProductCategoryContext }}>
            {children}
        </ProductsContext.Provider>

    )
}

export default ProductsContext;