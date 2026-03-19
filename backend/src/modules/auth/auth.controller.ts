import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";
import { successResponse, errorResponse } from "../../utils/response";
import { verifyRefreshToken, generateAccessToken } from "../../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await registerUser(email, password);

    return successResponse(res, user, "User registered successfully");
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await loginUser(
      email,
      password
    );

    // set refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // change to true in production
      sameSite: "lax",
    });

    return successResponse(
      res,
      { user, accessToken },
      "Login successful"
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 401);
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return errorResponse(res, "No refresh token", 401);
    }

    const decoded: any = verifyRefreshToken(token);

    const newAccessToken = generateAccessToken({
      userId: decoded.userId,
    });

    return successResponse(res, { accessToken: newAccessToken });
  } catch (error: any) {
    return errorResponse(res, "Invalid refresh token", 401);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("refreshToken");

  return successResponse(res, null, "Logged out successfully");
};