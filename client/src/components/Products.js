import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Products() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const addProduct = () => {
        if (!name || !price || !stock) {
            setFeedback('Name, Price, and Stock are required.');
            return;
        }

        fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, price: parseFloat(price), stock: parseInt(stock) }),
        })
            .then((response) => response.json())
            .then((newProduct) => {
                setProducts([...products, newProduct]);
                setName('');
                setDescription('');
                setPrice('');
                setStock('');
                setFeedback('Product added successfully!');
            })
            .catch((error) => {
                console.error('Error adding product:', error);
                setFeedback('Failed to add product.');
            });
    };

    return (
        <div className="list-container">
            <Header />
            <div>
                <br></br>
                <Link to="/dashboard" className="nav-link">
                    Return to Dashboard
                </Link>
            </div>           
            
            <h2>Add New Product</h2>
            {feedback && <p className="feedback">{feedback}</p>}
            <form>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-input"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-input"
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="form-input"
                />
                <button type="button" onClick={addProduct} className="form-button">
                    Add Product
                </button>
            </form>
            <h1>Products</h1>
            <ul className="list">                        
                {products.map((product) => (
                    <li key={product.id} className="list-item">
                        <div className='title'>{product.name}</div> <div className='description'>{product.description || 'No description'}</div> Price: ${product.price} -- {product.stock} in stock
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Products;
