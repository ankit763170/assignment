const express = require('express');
const cors = require('cors');
const products = require('./data/products');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Place an order
app.post('/api/order', (req, res) => {
  const { firstName, lastName, address, cartItems } = req.body;

  if (!firstName || !lastName || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  console.log('Order Placed:', {
    firstName,
    lastName,
    address,
    cartItems,
  });

  res.json({ message: 'Order placed successfully!' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
