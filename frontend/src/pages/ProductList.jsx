import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // <-- import navigate hook

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate(); // <-- initialize

  useEffect(() => {
    axios.get('http://localhost:5000/api/products').then((res) => setProducts(res.data));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate('/cart'); // <-- redirect to cart
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 20,
      padding: 20,
    }}>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '15px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
            textAlign: 'center',
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '10px',
            }}
          />
          <h3 style={{ margin: '10px 0' }}>{product.name}</h3>
          <p style={{ color: '#555', fontSize: '0.9rem' }}>{product.description}</p>
          <strong style={{ fontSize: '1.1rem', display: 'block', margin: '10px 0' }}>
            ${product.price}
          </strong>
          <button
            onClick={() => handleAddToCart(product)}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
