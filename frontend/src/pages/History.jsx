import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { Box } from '@mui/material'
import { useUserStore } from '../store/user.js';
import { DataGrid } from '@mui/x-data-grid';
const generateRandomBillNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
const columns = [
  {
    field: "billNumber",
    headerName: "Bill Number",
    width: 150,
    valueGetter: () => generateRandomBillNumber(), // Generate random bill number
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 170,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 210,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    width: 150,
    // editable: true,
  }
];

export default function History() {
  const rows = useUserStore((state) => state.values);
  console.log('\nIN History COMPONENT : ', rows);
  return (
    <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <h1>History</h1>
            <Box sx={{ height: 700, width: '80%' }}>
                <DataGrid
                  rows={rows}
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
        </Box>
    </Box>
  )
}
