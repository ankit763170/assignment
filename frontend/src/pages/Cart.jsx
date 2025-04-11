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
      setMessage(err.response.data.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          {item.name} x {item.quantity} = ${(item.quantity * item.price).toFixed(2)}
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>

      <input name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input name="address" placeholder="Address" onChange={handleChange} required />

      <button onClick={placeOrder}>Place Order</button>
      {message && <p>{message}</p>}
    </div>
  );
}
