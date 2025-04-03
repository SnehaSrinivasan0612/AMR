import {React, useState, useEffect} from 'react'
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
import BillSplit from '../components/BillSplit.jsx';
import Button from '@mui/material/Button';

export default function Bill() {
  const values = useUserStore((state) => state.values);
  const [unpaidBills, setUnpaidBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnpaidBills = async () => {
      try {
        if (!values || values.length === 0) {
          throw new Error('No user data available');
        }

        const userId = values[0].uid;
        const response = await fetch(`http://localhost:5000/bills/unpaid/${userId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch unpaid bills');
        }

        const data = await response.json();
        setUnpaidBills(data);
      } catch (err) {
        console.error('Error fetching unpaid bills:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUnpaidBills();
  }, [values]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handlePayBill = (billId) => {
    fetch(`http://localhost:5000/bills/pay/${billId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Paid" }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Bill updated:", data);
        setUnpaidBills((prevBills) => prevBills.filter((bill) => bill._id !== billId));
        alert("Bill Paid Successfully!");
      })
      .catch((error) => console.error("Error updating bill:", error));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      {unpaidBills.length === 0 ? <p>No pending bills.</p> : 
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Bill</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">BILL NO</TableCell>
                  <TableCell align="right">BASIC ENERGY CHARGE</TableCell>
                  <TableCell align="right">DUE DATE</TableCell>
                  <TableCell align="right">PAY OPTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unpaidBills.map((row) => (
                  <TableRow
                    key={row.billno}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">{row.billno}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" color="success" onClick={() => handlePayBill(row._id)}>
                        PAY NOW
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box height={50} />
          <BillSplit bills={unpaidBills} />
        </Box>
      }
    </Box>
  );
}
