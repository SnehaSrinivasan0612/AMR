import React from 'react'
import Navbar from '../components/Navbar.jsx'
// import KPICard from './KPICard.jsx';
// import Barchart from './Barchart.jsx';
import { Box } from '@mui/material'
// import Grid from '@mui/material/Grid2';
import  { Mycharts }  from '../components/Mycharts.jsx';
import { useUserStore } from '../store/user.js';



export default function Dashboard() {
    const values = useUserStore((state) => state.values);
    console.log('\nIN DASHBOARD COMPONENT : ', values);
  return (
    <>
        <Box sx={{ display: 'flex' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <h1>home</h1>
                <Mycharts />
                {/* <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid size={6}  display="flex" justifyContent="center" alignItems="center" > <KPICard /> </Grid>
                        <Grid size={6}  display="flex" justifyContent="center" alignItems="center" > <KPICard /> </Grid>
                    </Grid>
                </Box>
                <Box height={50} />
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid size={12}  display="flex" justifyContent="center" alignItems="center" > <Barchart /> </Grid>      
                    </Grid>
                </Box> */}
            </Box>
        </Box>
    </>
  )
}
{/* <Grid size={6}  display="flex" justifyContent="center" alignItems="center" > <KPICard /> </Grid> */}
