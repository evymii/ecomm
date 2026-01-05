import { Router, type Response } from "express";
import { authenticate, requireAdmin, type AuthRequest } from "../middleware/auth";
import User from "../models/User";

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(requireAdmin);

// Admin dashboard
router.get("/dashboard", async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    res.json({
      message: "Admin dashboard route",
      admin: req.user,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    res.status(500).json({ error: "Failed to get admin dashboard" });
  }
});

// Get all users (admin only)
router.get("/users", async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const users = await User.find().select("-password");
    res.json({
      message: "All users",
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Failed to get users" });
  }
});

// Products management (placeholder)
router.get("/products", async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    res.json({
      message: "Admin products management route",
      products: [],
    });
  } catch (error) {
    console.error("Admin products error:", error);
    res.status(500).json({ error: "Failed to get products" });
  }
});

// Orders management (placeholder)
router.get("/orders", async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    res.json({
      message: "Admin orders management route",
      orders: [],
    });
  } catch (error) {
    console.error("Admin orders error:", error);
    res.status(500).json({ error: "Failed to get orders" });
  }
});

export default router;

