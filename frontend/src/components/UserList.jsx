import React, { useState, useEffect } from 'react';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          throw new Error('No admin token found');
        }

        const response = await fetch('http://localhost:5000/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to fetch users' }));
          throw new Error(errorData.message || 'Failed to fetch users');
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format');
        }
        
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-list">
      <h2>User List</h2>
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Consumer Number</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.consumer_num}</td>
                <td>{`${user.first_name} ${user.last_name}`}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList; 