import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js"
import cors from 'cors'
import { google } from 'googleapis';
import User from './models/user.model.js';
import Bill from './models/bill.model.js';

dotenv.config();
const app = express();
const port = 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
// app.use(cors());
app.use(cors({
    origin: 'https://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))


const fetchSpreadsheetData = async (req, res) => {
  
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
    //console.log(getRows.data.values);
    return getRows.data.values;
}

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
  const headers = [...arr[0], 'status'];
  return arr.slice(1).map(row => {
      const obj = Object.fromEntries(
          headers.map((header, index) => [header, row[index] || null])
      );

      // Parse and validate 'amount'
      const units = parseInt(obj.amount, 10);
      obj.billno = Math.floor(100000 + Math.random() * 900000).toString(); // Assign `billno` (Fix: using correct key)
      
      if (!isNaN(units)) {
          obj.amount = calculateElectricityBill(units);
          obj.status = Math.random() < 0.5 ? 'Paid' : 'Unpaid';
      } else {
          obj.amount = 'Invalid amount';
          obj.status = 'Unknown';
      }

      return obj;
  });
};



async function insertUniqueDocuments(arr) {
  try {
    for (const doc of arr) {
      const existingDoc = await Bill.findOne({
        date: doc.date,
        amount: doc.amount,
        uid: doc.uid
      });

      if (!existingDoc) {
        await Bill.create(doc);
        //console.log("Inserted:", doc);
      } 
      // else {
      //   console.log("Already exists, skipping:", doc);
      // }
    }
  } catch (error) {
    console.error("Error:", error);
  } 
}

// app.get('/', async (req, res) => {
//   const user = { 
//       consumer_num: "6009", 
//       password: "123", 
//       first_name: "John", 
//       last_name: "Doe", 
//       phone: "+91 999888777", 
//       email: "john@gmail.com" 
//   };
//   const newUser = new User(user);

//   try {
//       await newUser.save();
//       res.status(201).json({ success: true, data: newUser });
//   } catch (error) {
//       console.error("Error saving user:", error); // Log error for debugging
//       res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// });



app.put("/bills/pay/:billId", async (req, res) => {
  try {
    const { billId } = req.params;
    const updatedBill = await Bill.findByIdAndUpdate(
      billId,
      { status: "Paid" },
      { new: true }
    );

    if (!updatedBill) {
      return res.status(404).json({ error: "Bill not found" });
    }

    res.json(updatedBill);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


app.get('/bills/paid/:uid', async (req, res) => {
  try {
      const paidBills = await Bill.find({ uid: String(req.params.uid), status: "Paid" });
      res.json(paidBills);
  } catch (error) {
      res.status(500).json({ error: "Error fetching paid bills" });
  }
});

app.get('/profile/:uid', async (req, res) => {
  try{
    const users = await User.find({ consumer_num: String(req.params.uid) });
    return res.status(200).json({ success: true, values: JSON.stringify(users)});
  }
  catch(error){
    return res.status(401).json({ success: false,message: 'Invalid consumer number ' });
  }
})

app.get('/bills/unpaid/:uid', async (req, res) => {
  try {
      const unpaidBills = await Bill.find({ uid: String(req.params.uid), status: "Unpaid" });
      res.json(unpaidBills);
  } catch (error) {
      res.status(500).json({ error: "Error fetching unpaid bills" });
  }
});

app.post('/api/login', async (req, res) => {
    const { id, password } = req.body;
    if (!id || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
  }
    console.log(password, id)
    const users = await User.find({ consumer_num:id });
    console.log(users)
    if (!users) {
      return res.status(401).json({ message: 'Invalid consumer number ' });
    }
    if (password === users[0].password)
    {
      const uid = users[0].consumer_num;
      const data = await fetchSpreadsheetData();
      const sheetData = data.slice(1).filter(row => {
        if (row[3] === uid){
          return row
        }
      })
      sheetData.unshift(data[0])
      const sdata = convertArrayToObjects(sheetData)
      insertUniqueDocuments(sdata);
      console.log('My data is :',sdata);
      res.status(200).json({ success: true, values: JSON.stringify(sdata)})
    }
    else{
      res.status(401).json({ success: false, message: 'Invalid Credentials' })
    }
})      

app.post('/updateDB', async (req, res) => {
  const {id, data_field, data_value} = req.body
  await User.findOneAndUpdate({ consumer_num:id },{ [data_field]: data_value});
  const users = await User.find({ consumer_num:id })
  console.log(users)
  return res.status(200).json({ success: true, values:req.body  })

})

app.listen(port, ()=>{
    connectDB();
    console.log(`Server is running on port ${port}`);
})