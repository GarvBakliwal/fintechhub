import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyToken } from "../lib/jwt";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticate: RequestHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {

  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized - No token" });
    return;
  }

  try {
    const payload = verifyToken(token) as { userId: string };

    req.userId = payload.userId;

    next();
  } catch (err) {
    console.error("Token verification failed:", err);

    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authenticate;