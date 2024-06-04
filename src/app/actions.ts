"use server";
import { headers } from "next/headers";

export async function getMeasurement() {
  const server_start = new Date().toISOString();

  // our application logic
  await new Promise((res) => setTimeout(res, 100));

  const server_end = new Date().toISOString();

  return {
    server_start,
    server_end,
    _rawHeaders: Object.fromEntries(headers()),
  };
}
