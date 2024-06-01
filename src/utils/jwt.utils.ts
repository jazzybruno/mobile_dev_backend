import { config } from "dotenv";
config({ path: "./.env" });
import jwt from 'jsonwebtoken';
import { JwtPayload } from "../types/jwt-payload.type";

const secret = process.env.JWT_KEY || '';

export const signToken = (payload : JwtPayload) => {
  return jwt.sign(payload, secret);
};

export const verifyToken = (token : string) => {
  token = token.replace("Bearer", "").trim();
  return jwt.verify(token, secret);
};