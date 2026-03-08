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

  console.log("===== AUTH DEBUG =====");
  console.log("Request URL:", req.originalUrl);
  console.log("Request Origin:", req.headers.origin);
  console.log("Request Host:", req.headers.host);
  console.log("Authorization Header:", req.headers.authorization);
  console.log("All Cookies:", req.cookies);

  const token = req.cookies?.token;

  console.log("Extracted Token:", token);
  console.log("Token exists:", !!token);

  if (!token) {
    res.status(401).json({ message: "Unauthorized - No token" });
    return;
  }

  console.log("Token length:", token.length);
  console.log("Token parts:", token.split(".").length);
  console.log("=======================");

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