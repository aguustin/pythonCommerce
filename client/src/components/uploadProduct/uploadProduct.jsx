import { useContext, useEffect, useState } from 'react';
import './uploadProduct.css';
import edit from '../../assets/edit-text.png'
import ProductsContext from '../../context/productsContext';
import addProduct from '../../assets/add-button.png';
import { uploadProductRequest } from '../api/productsRequest';

const UploadProduct = () => {

    const {products, setProducts} = useContext(ProductsContext)
    const [createProductForm, setCreateProductForm] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    
    // Function to filter products based on the search term
    const filteredProducts = products.filter(product =>
        new RegExp(searchTerm, 'i').test(product.productName)
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update search term state
    };

      useEffect(() => {
        fetch('http://127.0.0.1:8000/getAllProducts/')
        .then(res=>res.json())
        .then(json=>setProducts(json));
    },[])

    const createProduct = async (e) => {
        const formData = new FormData();
        e.preventDefault()
        setCreateProductForm(false)
        const imageFile = e.target.elements.image.files[0];
        console.log("Image File:", imageFile);
        //const data = {
            formData.append("title", e.target.elements.title.value),
            formData.append("price",e.target.elements.price.value),
            formData.append("description", e.target.elements.description.value),
            formData.append("category", e.target.elements.category.value),
            formData.append("quantity", e.target.elements.count.value),
            formData.append("image", e.target.elements.image.files[0])
       // }
    
        await uploadProductRequest(formData)
    }
    
    return(
        <>
            {createProductForm &&
                <> 
               
                    <div className='back-shadow'></div>
                    <form className='addProductForm' onSubmit={(e) => createProduct(e)}>
                        <div className='add-product-form'>
                            <label>Product title</label>
                            <input type='text' name="title"></input>
                        </div>
                        <div className='add-product-form'>
                            <label>Product category</label>
                            <select name="category" id="pet-select">
                                <option value="" selected>--Please choose an option--</option>
                                <option value="men's clothing">mens clothing</option>
                                <option value="jewelery">jewelery</option>
                                <option value="electronics">electronics</option>
                                <option value="women's clothing">womens clothing</option>
                            </select>
                        </div>
                        <div className='add-product-form'>
                            <label>Product price</label>
                            <input type='number' name="price"></input>
                        </div>
                        <div className='add-product-form'>
                            <label>Product description</label>
                            <input type='text' name="description"></input>
                        </div>
                        <div className='add-product-form'>
                            <label>Product image</label>
                            <input type='file' name="image"></input>
                        </div>
                        <div className='add-product-form'>
                            <label>Stock:</label>
                            <input type='number' name="count"></input>
                        </div>
                        <button type="submit">Upload</button>
                    </form>
            </>
            }
               
                <h1>Products</h1>
                <div className='search-add-container'>
                    <form className='search'>
                        <label>Buscar producto</label>
                        <input type="text" className="form-control" placeholder="" name="search" value={searchTerm} onChange={handleSearchChange}/>
                    </form>
                    <div className='add'>
                        <label>Añadir producto</label>
                        <button onClick={() => setCreateProductForm(true)}><img src={addProduct} alt=""></img></button>
                    </div>
                </div>
                <div className='products-container'>
                    {filteredProducts.map((p) => 
                    <div key={p.id} className='product'>
                        <img src={p.image} alt=""></img>
                        <div className='product-info'>
                            <img className='editImg' src={edit} alt=""></img>
                            <h2>{p.productName}</h2>
                            <div className='cat-pri-rate'>
                                <h3 className='text-success'>{p.category}</h3>
                                <label className='text-success'>Price: ${p.price}</label>
                                <label className='lab text-success'>Rate: {p.rate}</label>
                            </div>
                            <p className='mt-3'>{p.description}</p>
                            <p className='text-success'>Stock: {p.quantity}</p>
                        </div>
                    </div>)}
                </div>
            
        </>
    )
}

export default UploadProduct;
