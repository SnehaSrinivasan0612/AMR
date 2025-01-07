import React from 'react'
import { useState } from 'react'
import '../assets/login.css'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user.js'
export default function Login() {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const setSpreadsheetData = useUserStore((state) => state.setSpreadsheetData);
    const navigate = useNavigate();

    function calculateElectricityBill(units) {
        let totalBill = 0;
        if (units <= 300) {
          totalBill = units * 6.40;
        } else if (units <= 350) {
          totalBill = (300 * 6.40) + ((units - 300) * 7.25);
        } else if (units <= 400) {
          totalBill = (300 * 6.40) + (50 * 7.25) + ((units - 350) * 7.60);
        } else if (units <= 500) {
          totalBill = (300 * 6.40) + (50 * 7.25) + (50 * 7.60) + ((units - 400) * 7.90);
        } else {
          totalBill = (300 * 6.40) + (50 * 7.25) + (50 * 7.60) + (100 * 7.90) + ((units - 500) * 8.80);
        }
      
        return parseFloat(totalBill.toFixed(2)); // Return the bill amount rounded to 2 decimal places
    }
    const convertArrayToObjects = (arr) => {
        const headers = arr[0]; // Get the column headers
        return arr.slice(1).map(row => {
            const obj = Object.fromEntries(
                headers.map((header, index) => [header, row[index]])
            );
    
            // Parse and validate 'amount'
            const units = parseInt(obj.amount, 10); // Convert to integer
            if (!isNaN(units)) {
                obj.amount = calculateElectricityBill(units); // Calculate bill for valid units
            } else {
                obj.amount = 'Invalid amount'; // Handle invalid units
            }
    
            return obj;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password)
        const data = {
            id: username,
            password: password
        }
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            const errorData = await response.json(); // Parse the error message
            // throw new Error(errorData.message || 'Failed to login');
            alert(errorData.message || 'Invalid login details. Please try again.'); 
            return;
        }
        const result = await response.json()
        console.log(JSON.parse(result.values))
        const spreadsheetData = JSON.parse(result.values);
        const objectsArray = convertArrayToObjects(spreadsheetData)
        setSpreadsheetData(objectsArray)
        navigate('/dashboard')
    }

  return (
    <div className='login-body'>
        <div className="login-container">
            <div className="login-box">
            <h2>Account Login</h2>
            <form>
                <div className="input-group">
                    <label htmlFor="user">User Name:</label>
                    <input type="text" id="user" name="user" value={username} onChange={(e)=> setusername(e.target.value)}  required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input type="text" id="password" name="password" value={password} onChange={(e)=> setpassword(e.target.value)} required />
                </div>
                <input type="submit" value="Submit" className="btn-primary" onClick={handleSubmit}/>
            </form>
            </div>
        </div>
    </div>
  )
}