import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verify token & attach user to request
export const requireAuth = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) return res.status(401).json({ error: "User not found" });

    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Allow only admins
export const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role)
    return res.status(403).json({ error: "Access denied" });
  next();
};
