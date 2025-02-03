import React from 'react'
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
  var values = useUserStore((state) => state.values);
  const unpaidRows = values.filter(row => row.status === "Unpaid");
  console.log('\nIN Bill COMPONENT : ', unpaidRows);
 // const lastBill = values.slice(-1)[0];
  console.log('my bill : ',values)
  const consumerName = (values[0].uid === '6879') ? 'Jessu': 'Ishu'
  // const rows = [
  //   createData(lastBill.uid,consumerName,  Math.floor(100000 + Math.random() * 900000).toString(), lastBill.amount, lastBill.date )
  // ]
  const rows = unpaidRows.map(row => 
    createData(
        row.uid, 
        consumerName, 
        Math.floor(100000 + Math.random() * 900000).toString(), 
        row.amount, 
        row.date
    )
);
  const paynow = (row) => {
    console.log('my paynow : ',row)
   // row.due_date = 'Paid'
//    values.forEach((item) => {
//     if (item.date === row.due_date) {
//         item.status = 'Paid'; // Update status to 'Paid'
//     }
// });
    console.log('after updation : ',values)
  }
  
  return (
    <Box sx={{ display: 'flex' }}>
            <Navbar />
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
                      {rows.map((row) => (
                        <TableRow
                          key={row.bill_no}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          {/* <TableCell component="th" scope="row">
                            {row.userid}
                          </TableCell>
                          <TableCell align="right">{row.conname}</TableCell> */}
                          {/* <TableCell align="right">{row.address}</TableCell> */}
                          <TableCell align="right">{row.bill_no}</TableCell>
                          <TableCell align="right">{row.amount}</TableCell>
                          <TableCell align="right">{row.due_date}</TableCell>
                          <TableCell align="right"><Button variant="contained" color="success" onClick={paynow(row)}>
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
        </Box>
  )
}
