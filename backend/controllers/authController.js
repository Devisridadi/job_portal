const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Function to generate JWT token
function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role
  };

  // Create token using secret key and expiry
  const token = jwt.sign(payload, process.env.JWT_SECRET , { expiresIn: '1h' });
  return token;
}

// Register route handler
async function register(req, res) {
  const { email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Save new user to DB
    const newUser = new User({ email, password, role });
    await newUser.save();
    console.log("✅ User created:", newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// Login route handler
async function login(req, res) {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password || user.role !== role) {
      return res.status(400).json({ message: "Invalid credentials or role" });
    }

    const token = generateToken(user);

    res.status(200).json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = {register, login};
