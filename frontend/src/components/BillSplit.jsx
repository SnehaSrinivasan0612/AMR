import React from "react";
import { useUserStore } from '../store/user.js';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function BillSplit() {
  const values = useUserStore((state) => state.values);
  const unpaidRows = values.filter(row => row.status === "Unpaid");
  const lastBill = unpaidRows.slice(-1)[0];
  const billDetails = [
    { description: "Energy Charge (EC)*", amount: lastBill.amount },
    { description: "Duty", amount: "40.97" },
    { description: "Fuel Surcharge", amount: "10.80" },
    { description: "Fixed Charge (FC)*", amount: "140.67" },
    { description: "Meter Rent", amount: "12.00" },
    { description: "EC Subsidy", amount: "-48.00", isSubsidy: true },
    { description: "FC Subsidy", amount: "-40.00", isSubsidy: true },
    { description: "Monthly Fuel Surcharge [KSEBL]", amount: "12.00" },
  ];

  function calculateTotalAmount(billDetails) {
    let totalAmount = 0;

    billDetails.forEach(item => {
        const amount = parseFloat(item.amount); // Convert the amount string to a number
        if (!isNaN(amount)) { // Check for valid numbers
            totalAmount += amount; // Add or subtract to the total
        }
    });

    return totalAmount.toFixed(2); // Return the total rounded to 2 decimal places
  }

  const totalAmount = calculateTotalAmount(billDetails);

  return (
    <Box sx={{ padding: 2, maxWidth: "800px", margin: "auto" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#0078D4", color: "#fff" }}>
                Bill Details
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "right",
                  backgroundColor: "#0078D4",
                  color: "#fff",
                }}
              >
                Amount (₹)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billDetails.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  {row.description}{" "}
                  {row.details && (
                    <Typography
                      variant="body2"
                      sx={{ color: "#0078D4", display: "inline", cursor: "pointer" }}
                    >
                      [{row.details}]
                    </Typography>
                  )}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "right",
                    color: row.isSubsidy ? "green" : "inherit",
                  }}
                >
                  {row.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#0078D4",
            color: "#fff",
            padding: 1,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Total Amount</Typography>
          <Typography sx={{ fontWeight: "bold" }}>{`₹ ${totalAmount}`}</Typography>
        </Box>
      </TableContainer>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        * Fraction of rupees rounded off in total amount is adjusted in Energy Charge/Fixed Charge.
      </Typography>
    </Box>
  );
}
