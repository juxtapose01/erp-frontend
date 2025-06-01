import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import './ProductDashboard.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    quantity: '',
    price: '',
    category: ''
  });
  const token = localStorage.getItem('token');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ name: '', quantity: '', price: '', category: '' });
      fetchProducts();
    } catch (err) {
      alert('Failed to add product (Are you an admin?)');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (err) {
      alert('Delete failed (Are you an admin?)');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-header">
        <h1>📦 Product Dashboard</h1>
      </div>

      <form className="product-form" onSubmit={handleAddProduct}>
        <h3>Add New Product</h3>
        <div className="form-group">
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleInput} required />
          <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleInput} required />
          <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleInput} required />
          <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleInput} />
          <button type="submit">Add Product</button>
        </div>
      </form>

      <div className="product-table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.quantity}</td>
                <td>${p.price}</td>
                <td>{p.category}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(p._id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
