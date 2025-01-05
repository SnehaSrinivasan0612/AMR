import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { Box } from '@mui/material'
export default function Help() {
  return (
    <Box sx={{ display: 'flex' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <h1>Help</h1>
            </Box>
        </Box>
  )
}
