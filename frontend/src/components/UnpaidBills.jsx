import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const UnpaidBills = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [searchBillNo, setSearchBillNo] = useState('');
  const [searchUid, setSearchUid] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUnpaidBills();
  }, []);

  const fetchUnpaidBills = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/unpaid-bills', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch unpaid bills');
      }

      const data = await response.json();
      setBills(data);
      setFilteredBills(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching unpaid bills:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    let filtered = bills;

    if (searchBillNo) {
      filtered = filtered.filter(bill => 
        bill.billno.toLowerCase().includes(searchBillNo.toLowerCase())
      );
    }

    if (searchUid) {
      filtered = filtered.filter(bill => 
        bill.uid.toLowerCase().includes(searchUid.toLowerCase())
      );
    }

    setFilteredBills(filtered);
  };

  const handleMarkAsPaid = async (billId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/mark-bill-paid/${billId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to mark bill as paid');
      }

      // Refresh the bills list
      fetchUnpaidBills();
    } catch (err) {
      console.error('Error marking bill as paid:', err);
      setError(err.message);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Unpaid Bills
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Search by Bill Number"
            variant="outlined"
            value={searchBillNo}
            onChange={(e) => setSearchBillNo(e.target.value)}
            size="small"
          />
          <TextField
            label="Search by Consumer ID"
            variant="outlined"
            value={searchUid}
            onChange={(e) => setSearchUid(e.target.value)}
            size="small"
          />
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Bill Number</StyledTableCell>
              <StyledTableCell>Consumer ID</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Due Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBills.map((bill) => (
              <TableRow key={bill._id}>
                <TableCell>{bill.billno}</TableCell>
                <TableCell>{bill.uid}</TableCell>
                <TableCell>₹{bill.amount}</TableCell>
                <TableCell>{new Date(bill.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Typography color="error">Unpaid</Typography>
                </TableCell>
                <TableCell>
                  <Tooltip title="Mark as Paid">
                    <Button variant="contained" color="success" onClick={() => handleMarkAsPaid(bill._id)}>
                                            Mark as Paid
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {filteredBills.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No unpaid bills found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UnpaidBills; 