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

function createData(userid, conname,  bill_no, amount, due_date) {
  return { userid, conname,  bill_no, amount, due_date};
}

export default function Bill() {
  //var values = useUserStore((state) => state.values);
  //const payBill = useUserStore((state) => state.payBill);
 // const unpaidRows = values.filter(row => row.status === "Unpaid");
  //const { updatevalues, payBill } = useUserStore();

  const values = useUserStore((state) => state.values);
  const userId = values[0].uid;
  const [unpaidBills, setUnpaidBills] = useState([]);


  useEffect(() => {
      console.log("Fetching paid bills...");
      fetch(`http://localhost:3000/bills/unpaid/${userId}`) // Hardcoded for testing
        .then(response => {
          console.log("Response:", response);
          return response.json();
        })
        .then(data => {
          console.log("Fetched unpaid bills:", data);
          setUnpaidBills(data);
        })
        .catch(error => console.error("Error fetching paid bills:", error));
    }, []);
  console.log('bills : ', unpaidBills)
  

const handlePayBill = (billId) => {
  fetch(`http://localhost:3000/bills/pay/${billId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "Paid" }), // Send updated status
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Bill updated:", data);
      // Remove the paid bill from the list
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
                <TableContainer  component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {/* <TableCell>UID</TableCell>
                        <TableCell align="right">NAME</TableCell> */}
                        {/* <TableCell align="right">ADDRESS</TableCell> */}
                        <TableCell align="right">BILL NO</TableCell>
                        {/* <TableCell align="right">UNITS</TableCell> */}
                        <TableCell align="right">ENERGY CHARGE</TableCell>
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
                          {/* <TableCell component="th" scope="row">
                            {row.userid}
                          </TableCell>
                          <TableCell align="right">{row.conname}</TableCell> */}
                          {/* <TableCell align="right">{row.address}</TableCell> */}
                          <TableCell align="right">{row.billno}</TableCell>
                          <TableCell align="right">{row.amount}</TableCell>
                          <TableCell align="right">{row.date}</TableCell>
                          <TableCell align="right"><Button variant="contained" color="success" onClick={() =>  handlePayBill(row._id)}>
                            PAY NOW
                          </Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box height={50} />
                <BillSplit />
            </Box>
            }
        </Box>
  )
}
