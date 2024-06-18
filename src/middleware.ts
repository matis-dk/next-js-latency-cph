import { NextResponse, type NextRequest, NextMiddleware } from "next/server";

const region = process.env.VERCEL_REGION;
export async function middleware(request: NextRequest) {
  console.log("AWS_REGION ====> ", process.env.AWS_REGION);
  console.log("AWS_DEFAULT_REGION ====> ", process.env.AWS_DEFAULT_REGION);
  console.log("VERCEL_REGION ====> ", process.env.VERCEL_REGION);
  const middleware_start = new Date().toISOString();
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // our application logic
  await new Promise((res) => setTimeout(res, 100));

  const middleware_end = new Date().toISOString();

  response.cookies.set("middleware_start", middleware_start);
  response.cookies.set("middleware_end", middleware_end);
  response.cookies.set("middleware_region", region ?? "unknown");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|api|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
