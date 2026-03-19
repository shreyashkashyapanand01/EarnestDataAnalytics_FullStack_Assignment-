import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { errorResponse } from "../utils/response";

// extend Request to include user
export interface AuthRequest extends Request {
  user?: { userId: string };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, "Unauthorized", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded: any = verifyAccessToken(token);

    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    return errorResponse(res, "Invalid or expired token", 401);
  }
};