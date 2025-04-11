import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products').then((res) => setProducts(res.data));
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, padding: 20 }}>
      {products.map((product) => (
        <div key={product.id} style={{ border: '1px solid #ccc', padding: 10 }}>
          <img src={product.image} alt={product.name} width="100%" />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <strong>${product.price}</strong>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
