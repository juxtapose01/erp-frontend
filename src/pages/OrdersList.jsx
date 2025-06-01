import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import './OrdersList.css';

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      setMessage('Failed to load orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <Header />
      <div className="orders-wrapper">
        <h2 className="orders-title">📦 All Orders</h2>

        {message && <p className="orders-message">{message}</p>}

        <table className="orders-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Ordered By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.product?.name}</td>
                <td>{order.quantity}</td>
                <td>{order.orderedBy?.name}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersList;
