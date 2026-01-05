import type { Request, Response, NextFunction } from "express";
import { verifyToken, type TokenPayload } from "../utils/jwt";
import User, { UserRole } from "../models/User";

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const authorize = (...roles: UserRole[]) => {
  return async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Authentication required" });
        return;
      }

      if (!roles.includes(req.user.role as UserRole)) {
        res.status(403).json({ error: "Access denied. Insufficient permissions" });
        return;
      }

      next();
    } catch (error) {
      res.status(403).json({ error: "Authorization failed" });
    }
  };
};

export const requireAdmin = authorize(UserRole.ADMIN);
export const requireUser = authorize(UserRole.USER, UserRole.ADMIN);

