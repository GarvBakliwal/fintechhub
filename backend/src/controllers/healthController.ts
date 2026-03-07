import { Request, Response } from "express";
import mongoose from "mongoose";

export const healthCheck = async (req: Request, res: Response) => {
  const dbState = mongoose.connection.readyState;

  const dbStatus =
    dbState === 1
      ? "connected"
      : dbState === 2
      ? "connecting"
      : dbState === 0
      ? "disconnected"
      : "unknown";

  res.status(200).json({
    status: "OK",
    server: "running",
    database: dbStatus,
    uptime: process.uptime(),
    timestamp: new Date(),
  });
};