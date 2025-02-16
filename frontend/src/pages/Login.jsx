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
       // console.log('my data in login',JSON.parse(result.values))
        const spreadsheetData = JSON.parse(result.values);
        // const objectsArray = convertArrayToObjects(spreadsheetData)
        console.log('phase 2',spreadsheetData)
        setSpreadsheetData(spreadsheetData)
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
                    <input type="password" id="password" name="password" value={password} onChange={(e)=> setpassword(e.target.value)} required />
                </div>
                <input type="submit" value="Submit" className="btn-primary" onClick={handleSubmit}/>
            </form>
            </div>
        </div>
    </div>
  )
}