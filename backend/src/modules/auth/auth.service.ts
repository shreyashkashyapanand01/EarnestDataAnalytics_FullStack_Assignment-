import prisma from "../../prisma/client";
import { hashPassword, comparePassword } from "../../utils/hash";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt";

// export const registerUser = async (email: string, password: string) => {
//   // check if user exists
//   const existingUser = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (existingUser) {
//     throw new Error("User already exists");
//   }

//   // hash password
//   const hashedPassword = await hashPassword(password);

//   // create user
//   const user = await prisma.user.create({
//     data: {
//       email,
//       password: hashedPassword,
//     },
//   });

//   return user;
// };

// export const loginUser = async (email: string, password: string) => {
//   const user = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (!user) {
//     throw new Error("Invalid credentials");
//   }

//   const isPasswordValid = await comparePassword(password, user.password);

//   if (!isPasswordValid) {
//     throw new Error("Invalid credentials");
//   }

//   const payload = { userId: user.id };

//   const accessToken = generateAccessToken(payload);
//   const refreshToken = generateRefreshToken(payload);

//   return { user, accessToken, refreshToken };
// };

export const registerUser = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // REMOVE password before returning
  const { password: _, ...safeUser } = user;

  return safeUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const payload = { userId: user.id };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // REMOVE password before returning
  const { password: _, ...safeUser } = user;

  return { user: safeUser, accessToken, refreshToken };
};