import { Router, type Response } from "express";
import { authenticate, requireUser, type AuthRequest } from "../middleware/auth";

const router = Router();

// All user routes require authentication
router.use(authenticate);
router.use(requireUser);

// User dashboard/profile
router.get("/profile", async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    res.json({
      message: "User profile route",
      user: req.user,
    });
  } catch (error) {
    console.error("User profile error:", error);
    res.status(500).json({ error: "Failed to get user profile" });
  }
});

// User orders (placeholder)
router.get("/orders", async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    res.json({
      message: "User orders route",
      userId: req.user.userId,
      orders: [],
    });
  } catch (error) {
    console.error("User orders error:", error);
    res.status(500).json({ error: "Failed to get user orders" });
  }
});

// User cart (placeholder)
router.get("/cart", async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    res.json({
      message: "User cart route",
      userId: req.user.userId,
      cart: [],
    });
  } catch (error) {
    console.error("User cart error:", error);
    res.status(500).json({ error: "Failed to get user cart" });
  }
});

export default router;

