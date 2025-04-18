// import User from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import db from '../index.js';
// import createTokenAndSaveCookie from "../jwt/generateToken.js";

// export const signup = async (req, res) => {
//   const { fullname, email, password, confirmPassword } = req.body;

//   try {
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords don't match." });
//     }

//     // Check if the user already exists
//     const existingUserQuery = 'SELECT * FROM users WHERE email = $1';
//     const existingUserResult = await db.query(existingUserQuery, [email]);

//     if (existingUserResult.rows.length > 0) {
//       return res.status(400).json({ message: 'User already exists.' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert new user
//     const insertUserQuery = `
//       INSERT INTO users (name, email, password)
//       VALUES ($1, $2, $3)
//       RETURNING id, name, email, created_at
//     `;
//     const values = [fullname, email, hashedPassword];
//     const result = await db.query(insertUserQuery, values);
//     const newUser = result.rows[0];

//     // Create token and send response
//     createTokenAndSaveCookie(newUser.id, res);

//     return res.status(201).json({ message: 'User created successfully.', newUser });

//   } catch (error) {
//     console.error('Signup Error:', error);
//     return res.status(500).json({ message: error.message || 'Something went wrong.' });
//   }
// };
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const userQuery = 'SELECT * FROM users WHERE email = $1';
//     const result = await db.query(userQuery, [email]);

//     const user = result.rows[0];

//     if (!user) {
//       return res.status(404).json({ message: 'Invalid credentials' });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(404).json({ message: 'Invalid credentials' });
//     }

//     // Create token and send cookie
//     createTokenAndSaveCookie(user.id, res);

//     // Send success response
//     res.status(200).json({
//       message: 'User logged in successfully.',
//       user: {
//         id: user.id,
//         fullname: user.name,
//         email: user.email
//       }
//     });

//   } catch (error) {
//     console.error('Login Error:', error);
//     return res.status(500).json({ message: error.message || 'Something went wrong.' });
//   }
// };
// export const logout = async (req, res) => {
//   try {
//     res.clearCookie("jwt");
//     res.status(200).json({ message: "User logged out successfully." });
//   } catch (error) {
//     console.error("Logout Error:", error);
//     res.status(500).json({ message: error.message || "Something went wrong." });
//   }
// }
