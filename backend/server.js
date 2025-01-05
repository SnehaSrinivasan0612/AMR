import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js"
import cors from 'cors'
import { google } from 'googleapis';
import User from './models/user.model.js';

dotenv.config();
const app = express();
const port = 3000;
app.use(express.json())
app.use(cors({
    origin: 'https://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))

const fetchData = async (req, res) => {
  
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  
    // Create client instance for auth
    const client = await auth.getClient();
  
    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });
  
    const spreadsheetId = "18Esp7ZeFSk64GBmxrA3uOTghphD3aQ5WWaY52UmvfR0";

    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Testing",
    });
    console.log(getRows.data.values);
    return getRows.data.values;
}

// app.get('/', async (req, res) => {
//     const user = { username: "ishita", password: "123", customerid: "2"}
//     const newUser = new User(user);
//     try{
//         await newUser.save();
//         res.status(201).json({ success: true, data: newUser })
//     }catch(error){
//         res.status(500).json({ success: false, message:'Server Error' })
//     }
// })

app.post('/api/login', async (req, res) => {
    const { id, password } = req.body;
    console.log(password, id)
    const data = await fetchData();
    console.log('My data is :',data);
    console.log("the end")
    res.status(200).json({ success: true, values: JSON.stringify(data)})
    // console.log(JSON.stringify(data))
})

app.listen(port, ()=>{
    connectDB();
    console.log(`Server is running on port ${port}`);
})