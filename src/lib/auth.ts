import { SignJWT, jwtVerify } from "jose";

// secrets must be Uint8Array (encoded from string)
const accessSecret = new TextEncoder().encode("access_secret");
const refreshSecret = new TextEncoder().encode("refresh_secret");

export async function generateAccessToken(userId: string) {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .sign(accessSecret);
}

export async function generateRefreshToken(userId: string) {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(refreshSecret);
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, accessSecret);
  return payload; // contains { userId, exp, iat }
}

export async function verifyRefreshToken(token: string) {
  const { payload } = await jwtVerify(token, refreshSecret);
  return payload;
}
