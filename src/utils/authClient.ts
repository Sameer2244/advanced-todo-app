"use server";

import { parse } from "cookie";

// Server-only helper used by API routes to validate incoming requests.
export const validateIncomingToken = async (req: Request) => {
  const cookies = parse(req.headers.get("cookie") || "");
  const token = cookies.accessToken;
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  } else {
    return token;
  }
};
