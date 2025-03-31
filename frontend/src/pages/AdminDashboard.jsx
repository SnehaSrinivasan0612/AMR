import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from '../components/UserList';
import AddUser from '../components/AddUser';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          throw new Error('No admin token found');
        }

        const statsResponse = await fetch('http://localhost:5000/api/admin/user-stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!statsResponse.ok) {
          const errorData = await statsResponse.json();
          throw new Error(`User stats error: ${errorData.message || 'Failed to fetch user statistics'}`);
        }

        const statsData = await statsResponse.json();
        setUserStats(statsData);
      } catch (err) {
        console.error('Error in fetchData:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.success) {
        // Clear any stored data
        localStorage.removeItem('adminToken');
        // Redirect to home page
        navigate(data.redirectUrl);
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still redirect to home page even if there's an error
      navigate('/');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <button 
            className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            User List
          </button>
          <button 
            className={`nav-button ${activeTab === 'add-user' ? 'active' : ''}`}
            onClick={() => setActiveTab('add-user')}
          >
            Add User
          </button>
          <button 
            className="nav-button logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </div>

      <div className="admin-content">
        {activeTab === 'dashboard' && (
          <>
            <h1>Admin Dashboard</h1>
            <div className="dashboard-grid">
              {/* Overall Statistics */}
              <div className="stats-card">
                <h2>Overall Statistics</h2>
                <div className="stats-grid">
                  <div className="stat-item">
                    <h3>Total Users</h3>
                    <p>{userStats?.totalUsers || 0}</p>
                  </div>
                  <div className="stat-item">
                    <h3>Active Users</h3>
                    <p>{userStats?.activeUsers || 0}</p>
                  </div>
                  <div className="stat-item">
                    <h3>Total Consumption</h3>
                    <p>{Math.round(userStats?.totalConsumption || 0)} kWh</p>
                  </div>
                  <div className="stat-item">
                    <h3>Average Usage</h3>
                    <p>{Math.round(userStats?.averageUsage || 0)} kWh</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'users' && <UserList />}
        {activeTab === 'add-user' && <AddUser />}
      </div>
    </div>
  );
};

export default AdminDashboard; 