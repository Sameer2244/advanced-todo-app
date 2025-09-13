import jwt from "jsonwebtoken";

export function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, "access_secret", { expiresIn: "15m" });
}

export function generateRefreshToken(userId: string) {
  return jwt.sign({ userId }, "refresh_secret", { expiresIn: "7d" });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, "access_secret");
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, "refresh_secret");
}
