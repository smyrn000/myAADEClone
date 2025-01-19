
import React, { useState, useEffect } from 'react';

function Products() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const addProduct = () => {
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
            })
            .catch((error) => console.error('Error adding product:', error));
    };

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.description} - ${product.price} - {product.stock} in stock
                    </li>
                ))}
            </ul>
            <h2>Add New Product</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
            />
            <button onClick={addProduct}>Add Product</button>
        </div>
    );
}

export default Products;
    