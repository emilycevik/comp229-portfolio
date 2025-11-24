import jwt from "jsonwebtoken";
import User from "../models/User.js";

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ===============================
// SIGN UP
// ===============================
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const user = await User.create({ name, email, password }); // password is hashed automatically
    const token = createToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// SIGN IN
// ===============================
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ error: "Invalid password" });

    const token = createToken(user._id);

    res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// SIGN OUT
// ===============================
export const signout = (_req, res) => {
  res.clearCookie("token");
  res.json({ message: "Signed out successfully" });
};
