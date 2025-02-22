import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import { Box, Button, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user.js';
import '../assets/profile.css';

export default function Profile() {
  const rows = useUserStore((state) => state.values);
  const userId = rows[0].uid;
  const [email, setEmail] = useState('random@example.com');
  const [phone, setPhone] = useState('9999999999');
  const [password, setPassword] = useState('*****');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [editField, setEditField] = useState(null);

  useEffect(() => {
    fetch(`/profile/${userId}`)
    .then(response => response.json())
    .then(data => {
      const user = JSON.parse(data.values)[0];
      //console.log(user);
      setFname(user.first_name);
      setLname(user.last_name);
      setEmail(user.email);
      setPhone(user.phone);
      setPassword(user.password);
    }) 
    .catch(err => console.error(err))
  }, []);

  const navigate = useNavigate();
  

  const handleUpdate = async (field, value) => {
    if (field === 'email') setEmail(value);
    else if (field === 'phone') setPhone(value);
    else if (field === 'password') setPassword('*****'); // Masked password
    setEditField(null);
    const data = {
      id: userId,
      data_field: field,
      data_value: value
    }
    console.log(data);
    const response = await fetch('http://localhost:3000/updateDB', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  if (!response.ok) {
      const errorData = await response.json(); // Parse the error message
      // throw new Error(errorData.message || 'Failed to login');
      alert(errorData.message || 'Invalid login details. Please try again.'); 
      return;
  }
  const result = await response.json()
  console.log(result);
};

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 'bold' }}>Hello, {fname} {lname}</Typography>
        <Card sx={{ maxWidth: 800, width: '100%', p: 2 }}>
          <CardHeader title="Your Profile" sx={{ backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }} />
          <CardContent>
            <Typography variant="body1"><strong>Consumer ID : </strong>{userId}</Typography><br/>
            <Typography variant="body1"><strong>First Name : </strong> {fname}</Typography><br/>
            <Typography variant="body1"><strong>Last Name : </strong>  {lname}</Typography><br/>
            <Typography variant="body1"><strong>Email ID : </strong> {email}</Typography>
            {editField === 'email' && (
              <Box>
                <TextField fullWidth label="New Email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                <Button variant="contained" color="primary" onClick={() => handleUpdate('email', email)}>Update</Button>
              </Box>
            )}
            
            <Button onClick={() => setEditField('email')} variant="outlined" color="success">Edit Email</Button>
            <br/>
            <br/><Typography variant="body1"><strong>Phone:</strong> {phone}</Typography>
            {editField === 'phone' && (
              <Box>
                <TextField fullWidth label="New Phone" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} />
                <Button variant="contained" color="primary" onClick={() => handleUpdate('phone', phone)}>Update</Button>
              </Box>
            )}
            <Button onClick={() => setEditField('phone')} variant="outlined" color="success">Edit Phone</Button><br/>
            <br/>
            <Typography variant="body1"><strong>Password:</strong> {password}</Typography>
            {editField === 'password' && (
              <Box>
                <TextField fullWidth type="password" label="New Password" onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" color="primary" onClick={() => handleUpdate('password', password)}>Update</Button>
              </Box>
            )}
            <Button onClick={() => setEditField('password')} variant="outlined" color="success">Change Password</Button><br/>
          </CardContent>
        </Card>
        {/* <Button variant="contained" color="error" sx={{ mt: 3 }} onClick={() => navigate('/logout')}>Logout</Button> */}
      </Box>
    </Box>
  );
}
