"use server";
import { headers } from "next/headers";

export async function getMeasurement() {
  const server_start = new Date().toISOString();

  const result = headers().get("X-Middleware-latencies");
  const middleware = result ? JSON.parse(result) : {};

  // our application logic
  await new Promise((res) => setTimeout(res, 100));

  const server_end = new Date().toISOString();

  return {
    ...middleware,
    server_start,
    server_end,
  };
}
