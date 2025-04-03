import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to AMR System</h1>
        <div className="info-section">
          <h2>About Our Service</h2>
          <p>
            Our Advanced Meter Reading (AMR) system provides efficient and accurate
            utility consumption monitoring. We help you track your usage, manage
            bills, and make informed decisions about your energy consumption.
          </p>
        </div>
        
        <div className="features-section">
          <h2>Key Features</h2>
          <ul>
            <li>Real-time consumption monitoring</li>
            <li>Detailed usage history</li>
            <li>Automated billing system</li>
            <li>Energy consumption analytics</li>
            <li>24/7 customer support</li>
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