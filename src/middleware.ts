import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const middleware_start = new Date().toISOString();
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // our application logic
  await new Promise((res) => setTimeout(res, 100));

  const middleware_end = new Date().toISOString();

  response.headers.set(
    "X-Middleware-latencies",
    JSON.stringify({ middleware_start, middleware_end })
  );

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|api|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
