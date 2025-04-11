import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

export default function Cart() {
  const { cartItems } = useCart();
  const [form, setForm] = useState({ firstName: '', lastName: '', address: '' });
  const [message, setMessage] = useState('');

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/order', {
        ...form,
        cartItems,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '30px',
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                borderBottom: '1px solid #eee',
                padding: '10px 0',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <h3 style={{ textAlign: 'right', marginTop: '10px' }}>
            Total: ${total.toFixed(2)}
          </h3>

          <div style={{ marginTop: '30px' }}>
            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <textarea
              name="address"
              placeholder="Address"
              onChange={handleChange}
              required
              style={{ ...inputStyle, height: '80px' }}
            />
            <button
              onClick={placeOrder}
              style={buttonStyle}
            >
              ✅ Place Order
            </button>
          </div>
          {message && (
            <p style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#e0ffe0',
              color: '#2e7d32',
              borderRadius: '5px'
            }}>
              {message}
            </p>
          )}
        </>
      )}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#4CAF50',
  color: 'white',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

