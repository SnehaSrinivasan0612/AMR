import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>ElectroBill - Electricity Consumption & Billing Portal</h1>
        <div className="info-section">
          <h2>About Our Service</h2>
          <p>
          This portal is designed to provide comprehensive, user-friendly access to your electricity usage details, bill generation, and payment processing, ensuring transparency and efficiency in energy management. Here, you can view your current consumption, track historical usage, and manage all billing activities with ease. The system is engineered to offer real-time updates on your electricity account, enabling you to monitor your energy expenditure and stay informed about any changes in tariff rates or billing schedules. Whether you are a residential customer or a commercial user, our goal is to facilitate smooth, accurate billing and timely payments, thereby supporting reliable and efficient electricity services</p>
        </div>
        
        <div className="features-section">
          <h2>Key Features</h2>
          <ul>
            <li>Real-time Consumption Monitoring</li>
            <li>Detailed Usage History</li>
            <li>Bill Generation & Breakdown</li>
            <li>Energy Consumption Analytics</li>
            <li>Usage History & Analytics</li>
            <li>User Account Management</li>
          </ul>
        </div>

        <div className="login-buttons">
          <button 
            className="consumer-login-btn"
            onClick={() => navigate('/login')}
          >
            Consumer Login
          </button>
          <button 
            className="admin-login-btn"
            onClick={() => navigate('/admin/login')}
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; 