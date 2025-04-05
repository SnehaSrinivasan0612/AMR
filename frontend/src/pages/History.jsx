import {React, useEffect, useState} from 'react'
import Navbar from '../components/Navbar.jsx'
import { Box } from '@mui/material'
import { useUserStore } from '../store/user.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function History() {
  const user = useUserStore((state) => state.user);
  const [paidBills, setPaidBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaidBills = async () => {
      try {
        if (!user || !user.uid) {
          throw new Error('No user data available');
        }

        const response = await fetch(`http://localhost:5000/bills/paid/${user.uid}`);

        if (!response.ok) {
          throw new Error('Failed to fetch paid bills');
        }

        const data = await response.json();
        setPaidBills(data);
      } catch (err) {
        console.error('Error fetching paid bills:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaidBills();
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>History</h1>
        {paidBills.length === 0 ? <p>No payments made.</p> : 
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">BILL NO</TableCell>
                  <TableCell align="right">DATE</TableCell>
                  <TableCell align="right">AMOUNT PAID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paidBills.map((row) => (
                  <TableRow
                    key={row.billno}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">{row.billno}</TableCell>
                    <TableCell align="right">{formatDate(row.date)}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </Box>
    </Box>
  );
}
