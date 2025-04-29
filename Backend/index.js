import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import {app,server} from './socketIO/server.js'; // Import the server instance from socketIO
import { getReceiverSocketId,io } from './socketIO/server.js';
import path from 'path';
// import userRoute from './routes/user.route.js';
dotenv.config();

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "ChatApp",
  password: "Shivam@55",
  port: 5432,
});
export default db;
// const app = express();

app.use(express.json()); // this will help us to read the data from the user (middleware)
app.use(cors()); // this will help us to connect the frontend and backend (middleware)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = process.env.PORT || 3001;
db.connect();

// code for deployment
if(process.env.NODE_ENV === 'production'){
  const dirPath= path.resolve();
  app.use(express.static("./Frontend/dist"));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(dirPath,"./Frontend/dist","index.html"));
  })
}

/*Signup page*/
app.post('/signup/user', async (req, res) => {
  const { name, email, password ,confirmPassword} = req.body;
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Password:', password); // Note: In a real application, avoid logging passwords

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.query(
      'INSERT INTO users (name,email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error('Detailed Error:', error); // Log detailed error information
    if (error.code === '23505') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});


// Login route
app.post('/login/user', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Logged in successfully', user: user.rows[0] });
  } catch (error) {
    console.error('Detailed Error:', error); // Log detailed error information
    res.status(500).json({ error: 'Server error' });
  }
});


//get all users
app.post('/api/user/allusers', async (req, res) => {
  const { email } = req.body;

  // 👇 Log the received email
  console.log("📩 Received email from frontend:", email);

  if (!email) {
    return res.status(400).json({ error: "Email is required in request body" });
  }

  try {
    const allUsers = await db.query(
      'SELECT * FROM users WHERE email != $1',
      [email]
    );

    // 👇 Log the result of the database query
    console.log("✅ Users fetched from database:", allUsers.rows);

    res.json(allUsers.rows);
  } catch (error) {
    console.error('❌ Detailed Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// API to send a message
app.post('/api/message/send/:receiverId', async (req, res) => {
   const { message } = req.body;
    const {receiverId } = req.params;
    const {senderId} = req.body; // current logged in user

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO messages (senderId,receiverId,message)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [senderId, receiverId, message]
    );
    // const messageId = result.rows[0].id;
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", result.rows[0]);
    }
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// to get all messages from the database
app.get('/api/message/get/:receiverId', async (req, res) => {
  const { receiverId } = req.params;
  const { senderId } = req.query; // or from req.user if using auth middleware

  if (!senderId) {
    return res.status(400).json({ error: 'Missing senderId' });
  }

  try {
    const result = await db.query(
      `SELECT * FROM messages
       WHERE (senderId = $1 AND receiverId = $2)
       OR (senderId = $2 AND receiverId = $1)

       ORDER BY sent_at ASC`,
      [senderId,receiverId]
    );
    console.log("📩 Messages fetched from database:", result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})