import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import './Orders.css';

function Orders() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      setMessage('Failed to load products');
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/orders',
        {
          product: selectedProduct,
          quantity: Number(quantity),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('✅ Order placed successfully!');
      setQuantity('');
      setSelectedProduct('');
      fetchProducts();
    } catch (err) {
      setMessage('❌ Order failed. Check stock or try again.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="order-page">
      <Header />
      <div className="order-wrapper">
        <h2 className="order-title">🛒 Place an Order</h2>

        <form onSubmit={handleOrder} className="order-form">
          <select
            className="order-select"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="">-- Select Product --</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} (Available: {p.quantity})
              </option>
            ))}
          </select>

          <input
            className="order-input"
            type="number"
            min="1"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <button className="order-btn" type="submit">Place Order</button>
        </form>

        {message && <p className="order-message">{message}</p>}
      </div>
    </div>
  );
}

export default Orders;
