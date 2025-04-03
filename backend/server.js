import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js"
import cors from 'cors'
import { google } from 'googleapis';
import User from './models/user.model.js';
import Bill from './models/bill.model.js';
import Admin from './models/Admin.js';
import jwt from 'jsonwebtoken';
import adminRoutes from './routes/admin.js';
import authRoutes from './routes/auth.js';
import { MongoClient } from 'mongodb';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Updated CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'https://script.google.com'],  // Add Google Apps Script domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Admin Authentication Middleware
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    
    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Admin Login Route
app.post('/api/admin/login', async (req, res) => {
  try {
    const { adminId, password } = req.body;
    
    const admin = await Admin.findOne({ adminId });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({
      token,
      admin: {
        id: admin._id,
        adminId: admin.adminId,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Dashboard Routes
app.get('/api/admin/consumption-data', authenticateAdmin, async (req, res) => {
  try {
    const bills = await Bill.find().sort({ date: 1 });
    
    // Group bills by month and calculate total consumption
    const monthlyData = bills.reduce((acc, bill) => {
      const date = new Date(bill.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = {
          total: 0,
          count: 0
        };
      }

      // Only add valid numeric amounts
      const amount = parseFloat(bill.amount);
      if (!isNaN(amount) && amount > 0) {
        acc[monthYear].total += amount;
        acc[monthYear].count += 1;
      }
      
      return acc;
    }, {});

    // Calculate monthly averages and ensure they're reasonable
    const monthlyAverages = Object.entries(monthlyData).reduce((acc, [month, data]) => {
      if (data.count > 0) {
        // Cap the average at 1000 kWh to prevent extreme values
        acc[month] = Math.min(data.total / data.count, 1000);
      } else {
        acc[month] = 0;
      }
      return acc;
    }, {});

    // Sort months chronologically
    const sortedMonths = Object.keys(monthlyAverages).sort((a, b) => {
      const [monthA, yearA] = a.split('/');
      const [monthB, yearB] = b.split('/');
      return yearA - yearB || monthA - monthB;
    });

    // Limit to last 12 months if we have more data
    const last12Months = sortedMonths.slice(-12);

    res.json({
      labels: last12Months,
      consumption: last12Months.map(month => monthlyAverages[month])
    });
  } catch (error) {
    console.error('Error in consumption data:', error);
    res.status(500).json({ message: 'Error fetching consumption data' });
  }
});

app.get('/api/admin/user-stats', authenticateAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    
    const bills = await Bill.find();
    const totalConsumption = bills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0);
    const averageUsage = totalConsumption / totalUsers;

    // Get user distribution by type (assuming there's a type field in User model)
    const userDistribution = await User.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalUsers,
      activeUsers,
      totalConsumption,
      averageUsage,
      userDistribution: userDistribution.map(d => d.count)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user statistics' });
  }
});

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

// router.post('/api/bills', async (req, res) => {
//   const client = new MongoClient(uri);
//   try {
//     await client.connect();
//     const collection = client.db("products").collection("bills");
    
//     // Insert all documents in one batch
//     const result = await collection.insertMany(req.body);
    
//     res.status(200).json({ success: true, insertedCount: result.insertedCount });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   } finally {
//     await client.close();
//   }
// });

app.post('/api/bills', async (req, res) => {
  try {
    const bills = req.body;
    console.log('Received bills:', JSON.stringify(bills, null, 2));
    
    if (!Array.isArray(bills)) {
      throw new Error('Request body must be an array of bills');
    }
    
    // Validate each bill before insertion
    const validatedBills = bills.map(bill => {
      if (!bill.date || !bill.uid || !bill.amount || !bill.status || !bill.billno) {
        throw new Error(`Invalid bill data: ${JSON.stringify(bill)}`);
      }
      return {
        ...bill,
        date: new Date(bill.date),
        amount: Number(bill.amount),
        uid: String(bill.uid)
      };
    });
    
    console.log('Validated bills:', JSON.stringify(validatedBills, null, 2));
    
    const result = await Bill.insertMany(validatedBills);
    console.log('Insertion result:', result);
    
    res.status(201).json({ 
      success: true, 
      message: 'Bills inserted successfully', 
      insertedCount: result.length 
    });
  } catch (error) {
    console.error('Error inserting bills:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: error.stack
    });
  }
});

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

    const users = await User.find({ consumer_num: id });
    if (!users || users.length === 0) {
      return res.status(401).json({ message: 'Invalid consumer number' });
    }

    if (password === users[0].password) {
      // Update last_login and set isActive to true
      await User.findByIdAndUpdate(users[0]._id, {
        last_login: new Date(),
        isActive: true
      });

      // Get user's bills from database
      const userBills = await Bill.find({ uid: users[0].consumer_num });

      // Return user data and bills
      res.status(200).json({
        success: true,
        user: {
          uid: users[0].consumer_num,
          first_name: users[0].first_name,
          last_name: users[0].last_name,
          email: users[0].email,
          phone: users[0].phone
        },
        values: userBills
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid Credentials' });
    }
});

app.post('/updateDB', async (req, res) => {
  const {id, data_field, data_value} = req.body
  await User.findOneAndUpdate({ consumer_num:id },{ [data_field]: data_value});
  const users = await User.find({ consumer_num:id })
  console.log(users)
  return res.status(200).json({ success: true, values:req.body  })

})

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Consumer routes
app.get('/api/consumer/bills/unpaid/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const bills = await Bill.find({ 
      consumer_num: userId,
      status: "Unpaid" 
    });
    res.json(bills);
  } catch (error) {
    console.error('Error fetching unpaid bills:', error);
    res.status(500).json({ message: 'Error fetching unpaid bills' });
  }
});

app.get('/api/consumer/bills/paid/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const bills = await Bill.find({ 
      consumer_num: userId,
      status: "Paid" 
    });
    res.json(bills);
  } catch (error) {
    console.error('Error fetching paid bills:', error);
    res.status(500).json({ message: 'Error fetching paid bills' });
  }
});

app.get('/api/consumer/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ consumer_num: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Change password endpoint
app.post('/api/consumer/change-password', async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    // Find user
    const user = await User.findOne({ consumer_num: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    if (currentPassword !== user.password) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Error changing password' });
  }
});

// Admin logout route
app.post('/api/admin/logout', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Logged out successfully',
    redirectUrl: '/'  // Add redirect URL
  });
});

// Consumer logout route
app.post('/api/logout', async (req, res) => {
  try {
    const { userId } = req.body;
    if (userId) {
      // Find and update user's isActive status
      await User.findOneAndUpdate(
        { consumer_num: userId },
        { isActive: false }
      );
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Logged out successfully',
      redirectUrl: '/'  // Add redirect URL
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error during logout',
      error: error.message 
    });
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});