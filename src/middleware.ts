import { getHostURI } from "@app/helpers/url-generator";
import { NextConfig } from "next";
import { NextRequest, NextResponse } from "next/server";

const saveCode = (
  newCode: string,
  { timelineURL }: { timelineURL: string }
): NextResponse => {
  // Set the cookie and redirect to /timeline
  const response = NextResponse.redirect(timelineURL);
  response.cookies.set("code", newCode, {
    secure: process.env.NODE_ENV === "production", // Set 'secure' only in production
    sameSite: "lax", // Recommended to prevent CSRF attacks
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
};

// eslint-disable-next-line max-statements
export const middleware = (request: NextRequest): NextResponse => {
  const pathName = request.nextUrl.pathname;

  const host = getHostURI(request);

  const timelineURL = `${host}/timeline`;
  const homeURL = `${host}/`;

  switch (pathName) {
    case "/spotify/callback": {
      const newCode = request.nextUrl.searchParams.get("code");
      if (!newCode) {
        console.warn("No code found, redirecting to Home page");
        return NextResponse.redirect(homeURL);
      }

      return saveCode(newCode, { timelineURL });
    }
    case "/timeline": {
      const currentCookie = request.cookies.get("code")?.value;
      if (!currentCookie) {
        console.warn("No cookie found, redirecting to Home page");
        return NextResponse.redirect(homeURL);
      }

      return NextResponse.next();
    }
    case "/": {
      const currentCookie = request.cookies.get("code")?.value;
      if (currentCookie) {
        console.warn('Cookie found, redirecting to "/timeline" page');
        const timelineUrl = `${getHostURI(request)}/timeline`;
        return NextResponse.redirect(timelineUrl);
      }

      return NextResponse.next();
    }
  }

  return NextResponse.next();
};

// See "Matching Paths" below to learn more
export const config: NextConfig = {
  matcher: ["/spotify/callback", "/timeline", "/"],
};
