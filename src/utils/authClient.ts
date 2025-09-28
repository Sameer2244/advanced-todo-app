import { parse } from "cookie";

export async function fetchGetCurrentUserClient() {
  const res = await fetch(`/api/getUser`, {
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) {
    // logout
    await fetchLogoutClient();
    return {
      user: null,
      loading: false,
    };
  }
  return res.json();
}

export async function fetchLoginClient(email: string, password: string) {
  const res = await fetch(`/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  return res.json();
}

export async function fetchRegisterClient(email: string, password: string) {
  const res = await fetch(`/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  return res.json();
}

export async function fetchLogoutClient() {
  const res = await fetch(`/api/logout`, { credentials: "include" });
  return res;
}

export const validateIncomingToken = (req: Request) => {
  const cookies = parse(req.headers.get("cookie") || "");
  const token = cookies.accessToken;
  console.log(!token);
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  } else {
    return token;
  }
};
