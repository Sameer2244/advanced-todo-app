"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const fetchGetApi = async (url: string): Promise<unknown> => {
  const cookieHeader = await getServerCookies();
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    credentials: "include",
    method: "GET",
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    cache: "no-store",
  });
  const response = await data.json();
  return response;
};

export const fetchPostApi = async (
  url: string,
  body: object
): Promise<unknown> => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  const response = await data.json();
  revalidatePath("/");
  return response;
};

export const getServerCookies = async () => {
  const cookieStore = await cookies();
  const cookieArray = cookieStore.getAll ? cookieStore.getAll() : [];
  return cookieArray.map((c) => `${c.name}=${c.value}`).join("; ");
};
