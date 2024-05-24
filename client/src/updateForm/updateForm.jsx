import { useContext } from "react"
import ProductsContext from "../context/productsContext"
import { updateProductRequest } from "../components/api/productsRequest"

const UpdateProductForm = () => {
    const {updateForm, previousStock, handleProductNameContext, handleProductDescriptionContext, handleProductPriceContext, handleProductQuantityContext, handleProductCategoryContext} = useContext(ProductsContext)
    
    const updateProduct = async (e) => {
        e.preventDefault();
        if(previousStock[0].quantity === updateForm[0].quantity){
            await updateProductRequest(updateForm[0], null, null)
            window.location.reload();
        }else if(previousStock[0].quantity < updateForm[0].quantity){
            const calculateNewStock = (updateForm[0].quantity - previousStock[0].quantity) 
            const pfs = e.target.elements.pfs.value * calculateNewStock;
            console.log(pfs);
            await updateProductRequest(updateForm[0], pfs, updateForm[0].quantity)
            window.location.reload();
        }
    }
    const handleProductName = (e) => {
        handleProductNameContext(e.target.value)
    }
    const handleProductDescription = (e) => {
        handleProductDescriptionContext(e.target.value)
    }
    const handleProductPrice = (e) => {
        handleProductPriceContext(e.target.value)
    }
    const handleProductQuantity = (e) => {
        handleProductQuantityContext(e.target.value)
    }
    const handleProductCategory = (e) => {
        handleProductCategoryContext(e.target.value)
    }


    return(
        <> 
        <div className='back-shadow'></div>
        <form className='addProductForm' onSubmit={(e) => updateProduct(e)}>
            <div className='add-product-form'>
                <label>Product title</label>
                <input type='text' name="title" value={updateForm[0].productName} onChange={handleProductName}></input>
            </div>
            <div className='add-product-form'>
                <label>Product category</label>
                <select name="category" id="pet-select" onChange={handleProductCategory}>
                    <option value="" defaultValue>{updateForm[0].category_code_id}</option>
                    <option value="men's clothing">mens clothing</option>
                    <option value="jewelery">jewelery</option>
                    <option value="electronics">electronics</option>
                    <option value="women's clothing">womens clothing</option>
                </select>
            </div>
            <div className='add-product-form'>
                <label>Product price</label>
                <input type='number' name="price" value={updateForm[0].price} onChange={handleProductPrice}></input>
            </div>
            <div className='add-product-form'>
                <label>Product description</label>
                <input type='text' name="description" value={updateForm[0].description} onChange={handleProductDescription}></input>
            </div>
            <div className='add-product-form'>
                <label>Stock:</label>
                <input type='number' name="quantity" value={updateForm[0].quantity} onChange={handleProductQuantity}></input>
            </div>
            <div className='add-product-form'>
                <label>Price for stock:</label>
                <input type='number' name="pfs"></input>
            </div>
            <button type="submit">Update</button>
        </form>
       
    </>
    )
}

export default UpdateProductForm;