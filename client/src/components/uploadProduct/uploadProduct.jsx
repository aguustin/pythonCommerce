import { useContext, useEffect, useState } from 'react';
import './uploadProduct.css';
import edit from '../../assets/edit-text.png'
import forbidden from '../../assets/forbidden.png';
import ProductsContext from '../../context/productsContext';
import addProduct from '../../assets/add-button.png';
import { uploadProductRequest } from '../api/productsRequest';
import UpdateProductForm from '../../updateForm/updateForm';

const UploadProduct = () => {

    const {products, setProducts, setUpdateForm, setPreviousStock, visibleForm, setVisibleForm} = useContext(ProductsContext)
    const [createProductForm, setCreateProductForm] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
 
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            formData.append("profits", e.target.elements.profits.value)
       // }
    
        await uploadProductRequest(formData)
        window.location.reload();
    }

    const deleteProduct = async (e, productId) => {
        e.preventDefault();
        const id = productId;
        await fetch(`http://127.0.0.1:8000/deleteProduct/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        setProducts(products.filter(product => product.id!== id));
    }

    const openUpdateForm = (productId) => {
        setVisibleForm(true);
        setPreviousStock(products.filter(product => product.id === productId))
        setUpdateForm(products.filter(product => product.id === productId))
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
                        <div className='add-product-form'>
                            <label>Price for stock:</label>
                            <input type='number' name="profits"></input>
                        </div>
                        <div className='d-flex items-center justify-content-between'>
                            <button type="submit">Upload</button>
                            <button onClick={() => setCreateProductForm(!createProductForm)}>Cancel</button>
                        </div>
                    </form>
            </>
            }
            {visibleForm && <UpdateProductForm/>}
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
                    {filteredProducts.map((p) => {
                    const cloudinaryImg = `https://res.cloudinary.com/drmcrdf4r/image/upload/v1715038215/${p.image}`
                    return(
                    <div key={p.id} className='product'>
                        <img src={cloudinaryImg} alt=""
                            onError={(e) => {
                                e.target.onerror = null; // To avoid infinite loop
                                e.target.src = p.image; // Use the original image source
                            }}
                        />
                        <div className='product-info'>
                            <button onClick={() => openUpdateForm(p.id)}><img className='editImg' src={edit} alt=""></img></button>
                            <button onClick={(e) => deleteProduct(e, p.id)}><img src={forbidden} alt=""></img></button>
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
                    )}
                </div>
            
        </>
    )
}

export default UploadProduct;
