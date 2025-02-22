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
  const rows = useUserStore((state) => state.values);
  const userId = rows[0].uid;
  const [paidBills, setPaidBills] = useState([]);

  // const paidRows = rows.filter(row => row.status === "Paid");
  // const history = useUserStore((state) => state.history);
  // const allBills = [...paidRows, ...history];  

  // useEffect(() => {
  //   fetch(`/bills/paid/${userId}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log("Fetched paid bills:", JSON.parse(data));
  //         setPaidBills(data)
  //       })
  //       .catch(error => console.error("Error fetching paid bills:", error));
  // }, []);

  useEffect(() => {
    console.log("Fetching paid bills...");
    fetch(`/bills/paid/${userId}`) // Hardcoded for testing
      .then(response => {
        console.log("Response:", response);
        return response.json();
      })
      .then(data => {
        console.log("Fetched paid bills:", data);
        setPaidBills(data);
      })
      .catch(error => console.error("Error fetching paid bills:", error));
  }, []);
  
  console.log('history : ', paidBills)


  //console.log('\nIN History COMPONENT : ',userId, rows);
  return (
    <Box sx={{ display: 'flex' }}>
        <Navbar />
        {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <h1>History</h1>
            <Box sx={{ height: 700, width: '60%' }}>
                <DataGrid
                  rows={paidRows}
                  columns={columns}
                  getRowId={(row) => row.date}
                  // initialState={{
                  //   pagination: {
                  //     paginationModel: {
                  //       pageSize: 8,
                  //     },
                  //   },
                  // }}
                  // pageSizeOptions={[8]}
                  // checkboxSelection
                  // disableRowSelectionOnClick
                />
            </Box>
        </Box> */}
         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <h1>Bill</h1>
                {paidBills.length === 0 ? <p>No payments made.</p> : <TableContainer  component={Paper}>
                  <Table sx={{ minWidth: 550 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {/* <TableCell>UID</TableCell>
                        <TableCell align="right">NAME</TableCell> */}
                        {/* <TableCell align="right">ADDRESS</TableCell> */}
                        <TableCell align="right">BILL NO</TableCell>
                        {/* <TableCell align="right">UNITS</TableCell> */}
                        {/* <TableCell align="right">ENERGY CHARGE</TableCell> */}
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
                          {/* <TableCell component="th" scope="row">
                            {row.userid}
                          </TableCell>
                          <TableCell align="right">{row.conname}</TableCell> */}
                          {/* <TableCell align="right">{row.address}</TableCell> */}
                          <TableCell align="right">{row.billno}</TableCell>
                          <TableCell align="right">{row.date}</TableCell>
                          <TableCell align="right">{row.amount}</TableCell>
                          
                          {/* <TableCell align="right"><Button variant="contained" color="success" >
                            PAY NOW
                          </Button></TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>}
            </Box>
    </Box>
  )
}
