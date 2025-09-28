"use server";

import { revalidatePath } from "next/cache";

export const fetchGetApi = async (url: string): Promise<unknown> => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    credentials: "include",
    method: "GET",
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
