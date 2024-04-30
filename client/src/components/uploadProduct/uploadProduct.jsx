import { useContext, useEffect, useState } from 'react';
import './uploadProduct.css';
import edit from '../../assets/edit-text.png'
import ProductsContext from '../../context/productsContext';
import addProduct from '../../assets/add-button.png';

const UploadProduct = () => {

    const {products, setProducts} = useContext(ProductsContext)
    const [createProductForm, setCreateProductForm] = useState(false)

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>setProducts(json));
    },[])

    const createProduct = (e) => {
        e.preventDefault()
        setCreateProductForm(false)
       
        data = {
            id: 100,
            title: "New Product",
            price: 100,
            description: "This is a new product",
            category: "electronics",
            image: "https://picsum.photos/200/300"  
        }
    }

    return(
        <>
            {createProductForm &&
                <> 
               
                "productName": post_values.get('title'),
                "description": post_values.get('description'),
                "price": post_values.get('price'),
                "quantity": post_values.get('count'),
                "image": post_values.get('image'),
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
                                <option value="men's clothing">men's clothing</option>
                                <option value="jewelery">jewelery</option>
                                <option value="electronics">electronics</option>
                                <option value="women's clothing">women's clothing</option>
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
                        <input type="text" className="form-control" placeholder="" name="search" onChange={() => set} />
                    </form>
                    <div className='add'>
                        <label>Añadir producto</label>
                        <button onClick={() => setCreateProductForm(true)}><img src={addProduct} alt=""></img></button>
                    </div>
                </div>
                <div className='products-container'>
                    {products.map((p) => 
                    <div key={p.id} className='product'>
                        <img src={p.image} alt=""></img>
                        <div className='product-info'>
                            <img className='editImg' src={edit} alt=""></img>
                            <h2>{p.title}</h2>
                            <div className='cat-pri-rate'>
                                <h3 className='text-success'>{p.category}</h3>
                                <label className='text-success'>Price: ${p.price}</label>
                                <label className='lab text-success'>Rate: {p.rating.rate}</label>
                            </div>
                            <p className='mt-3'>{p.description}</p>
                            <p className='text-success'>Stock: {p.rating.count}</p>
                        </div>
                    </div>)}
                </div>
            
        </>
    )
}

export default UploadProduct;