import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

function Dashboard() {
  const [revenue, setRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const token = localStorage.getItem('token');

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRevenue(res.data.totalRevenue);
      setTotalOrders(res.data.totalOrders);
    } catch (err) {
      console.error('Stats fetch failed');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const data = {
    labels: ['Total Orders', 'Total Revenue'],
    datasets: [
      {
        label: 'ERP Stats',
        data: [totalOrders, revenue],
        backgroundColor: ['#4caf50', '#2196f3'],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div style={{ padding: '40px' }}>
          <Header />
      <h2>ERP Revenue Dashboard</h2>
      <Bar data={data} />
    </div>
  );
}

export default Dashboard;
