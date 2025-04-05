import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import { Box, Button, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user.js';
import ChangePasswordDialog from '../components/ChangePasswordDialog.jsx';
import '../assets/profile.css';

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const clearStore = useUserStore((state) => state.clearStore);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('*****');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [editField, setEditField] = useState(null);
  const [error, setError] = useState(null);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user || !user.uid) {
          throw new Error('No user data available');
        }

        const response = await fetch(`http://localhost:5000/api/consumer/profile/${user.uid}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        
        // Update state with user data
        setFname(data.first_name);
        setLname(data.last_name);
        setEmail(data.email);
        setPhone(data.phone);
        setPassword('*****'); // Masked password
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, [user]);

  const handleUpdate = async (field, value) => {
    try {
      if (!user || !user.uid) {
        throw new Error('No user data available');
      }

      const data = {
        id: user.uid,
        data_field: field,
        data_value: value
      };

      const response = await fetch('http://localhost:5000/updateDB', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      // Update local state
      if (field === 'email') setEmail(value);
      else if (field === 'phone') setPhone(value);
      else if (field === 'password') setPassword('*****');

      setEditField(null);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert(err.message || 'Failed to update profile');
    }
  };

  const handlePasswordUpdate = async (userId, currentPassword, newPassword) => {
    try {
      const response = await fetch('http://localhost:5000/api/consumer/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          currentPassword,
          newPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update password');
      }

      setPassword('******'); // Update masked password in UI
      clearStore(); // Clear the user store
    } catch (err) {
      throw new Error(err.message || 'Failed to update password');
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Hello, {fname} {lname}</Typography>
        <Card sx={{ maxWidth: 800, width: '100%', p: 2 }}>
          <CardHeader title="Your Profile" sx={{ backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }} />
          <CardContent>
            <Typography variant="body1"><strong>Consumer ID : </strong>{user?.uid}</Typography><br/>
            <Typography variant="body1"><strong>First Name : </strong> {fname}</Typography><br/>
            <Typography variant="body1"><strong>Last Name : </strong>  {lname}</Typography><br/>
            <Typography variant="body1"><strong>Email ID : </strong> {email}</Typography>
            {editField === 'email' && (
              <Box>
                <TextField sx={{ mt: 1 }} fullWidth label="New Email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                <Button variant="contained" color="success" onClick={() => handleUpdate('email', email)}>Update</Button>
              </Box>
            )}
            
            <Button onClick={() => setEditField('email')} variant="contained" color="success" sx={{ mt: 1 }}>Edit Email</Button>
            <br/>
            <br/><Typography variant="body1"><strong>Phone:</strong> {phone}</Typography>
            {editField === 'phone' && (
              <Box>
                <TextField sx={{ mt: 1 }} fullWidth label="New Phone" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} />
                <Button variant="contained" color="success" onClick={() => handleUpdate('phone', phone)}>Update</Button>
              </Box>
            )}
            <Button onClick={() => setEditField('phone')} variant="contained" color="success" sx={{ mt: 1 }}>Edit Phone</Button><br/>
            <br/>
            <Typography variant="body1"><strong>Password:</strong> {password}</Typography>
            <Button 
              onClick={() => setPasswordDialogOpen(true)} 
              variant="contained" 
              color="success"
              sx={{ mt: 1 }}
            >
              Change Password
            </Button>
          </CardContent>
        </Card>
      </Box>

      <ChangePasswordDialog
        open={passwordDialogOpen}
        onClose={() => setPasswordDialogOpen(false)}
        onUpdate={handlePasswordUpdate}
        userId={user?.uid}
      />
    </Box>
  );
}
