import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import { Box, Button, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../assets/profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('random@example.com');
  const [phone, setPhone] = useState('9999999999');
  const [password, setPassword] = useState('*****');
  const [editField, setEditField] = useState(null);

  const handleUpdate = (field, value) => {
    if (field === 'email') setEmail(value);
    else if (field === 'phone') setPhone(value);
    else if (field === 'password') setPassword('*****'); // Masked password
    setEditField(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 'bold' }}>Hello, Jane!</Typography>
        <Card sx={{ maxWidth: 800, width: '100%', p: 2 }}>
          <CardHeader title="Your Profile" sx={{ backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }} />
          <CardContent>
            <Typography variant="body1"><strong>Consumer ID:</strong> ----</Typography>
            <Typography variant="body1"><strong>First Name:</strong> Jane</Typography>
            <Typography variant="body1"><strong>Last Name:</strong> Doe</Typography>
            <Typography variant="body1"><strong>Email ID:</strong> {email}</Typography>
            {editField === 'email' && (
              <Box>
                <TextField fullWidth label="New Email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                <Button variant="contained" color="primary" onClick={() => handleUpdate('email', email)}>Update</Button>
              </Box>
            )}
            <Button onClick={() => setEditField('email')} variant="outlined" color="success">Edit Email</Button>
            
            <Typography variant="body1"><strong>Phone:</strong> +91 {phone}</Typography>
            {editField === 'phone' && (
              <Box>
                <TextField fullWidth label="New Phone" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} />
                <Button variant="contained" color="primary" onClick={() => handleUpdate('phone', phone)}>Update</Button>
              </Box>
            )}
            <Button onClick={() => setEditField('phone')} variant="outlined" color="success">Edit Phone</Button>
            
            <Typography variant="body1"><strong>Password:</strong> {password}</Typography>
            {editField === 'password' && (
              <Box>
                <TextField fullWidth type="password" label="New Password" onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" color="primary" onClick={() => handleUpdate('password', password)}>Update</Button>
              </Box>
            )}
            <Button onClick={() => setEditField('password')} variant="outlined" color="success">Change Password</Button>
          </CardContent>
        </Card>
        <Button variant="contained" color="error" sx={{ mt: 3 }} onClick={() => navigate('/logout')}>Logout</Button>
      </Box>
    </Box>
  );
}
