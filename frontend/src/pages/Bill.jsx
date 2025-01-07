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
function createData(userid, conname, address, bill_no, amount, due_date) {
  return { userid, conname, address, bill_no, amount, due_date};
}

export default function Bill() {
  const values = useUserStore((state) => state.values);
  console.log('\nIN Bill COMPONENT : ', values);
  const lastBill = values.slice(-1)[0];
  console.log('my bill : ',lastBill.amount)
  const consumerName = (lastBill.uid === '6879') ? 'Jessu': 'Ishu'
  const rows = [
    createData(lastBill.uid,consumerName, lastBill.address, Math.floor(100000 + Math.random() * 900000).toString(), lastBill.amount, lastBill.date )
  ]
  
  return (
    <Box sx={{ display: 'flex' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <h1>Bill</h1>
                <TableContainer  component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>UID</TableCell>
                        <TableCell align="right">NAME</TableCell>
                        <TableCell align="right">ADDRESS</TableCell>
                        <TableCell align="right">BILL NO</TableCell>
                        {/* <TableCell align="right">UNITS</TableCell> */}
                        <TableCell align="right">DUE AMOUNT</TableCell>
                        <TableCell align="right">DUE DATE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.userid}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.userid}
                          </TableCell>
                          <TableCell align="right">{row.conname}</TableCell>
                          <TableCell align="right">{row.address}</TableCell>
                          <TableCell align="right">{row.bill_no}</TableCell>
                          <TableCell align="right">{row.amount}</TableCell>
                          <TableCell align="right">{row.due_date}</TableCell>
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
