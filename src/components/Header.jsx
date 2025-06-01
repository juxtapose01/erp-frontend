import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={{
      padding: '10px',
      background: '#f2f2f2',
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <span>Logged in as: <b>{user?.name}</b> ({user?.role})</span>

        {/* 👇 Products — Admin only */}
        {user?.role === 'admin' && (
          <button onClick={() => navigate('/products')} style={{ marginLeft: '10px' }}>
            Products
          </button>
        )}

        {/* 👥 Both admin & staff can place orders */}
        <button onClick={() => navigate('/orders')} style={{ marginLeft: '10px' }}>
          Place Order
        </button>

        {/* 📋 Orders List — Admin only */}
        {user?.role === 'admin' && (
          <button onClick={() => navigate('/orders-list')} style={{ marginLeft: '10px' }}>
            View Orders
          </button>
        )}

        {/* 📈 Dashboard — Admin only */}
        {user?.role === 'admin' && (
          <button onClick={() => navigate('/dashboard')} style={{ marginLeft: '10px' }}>
            Dashboard
          </button>
        )}
      </div>

      <button onClick={handleLogout} style={{ backgroundColor: '#ff4d4d' }}>
        Logout
      </button>
    </div>
  );
}

export default Header;
