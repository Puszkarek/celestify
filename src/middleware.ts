import { getSpotifyAccessToken } from "@app/helpers/spotify";
import { getHostURI } from "@app/helpers/url-generator";
import { pipe } from "fp-ts/lib/function";
import * as T from "fp-ts/Task";
import * as TE from "fp-ts/TaskEither";
import { NextConfig } from "next";
import { NextRequest, NextResponse } from "next/server";

const saveCode = (
  code: string,
  { timelineURL, homeURL }: { timelineURL: string; homeURL: string }
): T.Task<NextResponse> => {
  return pipe(
    code,
    getSpotifyAccessToken,
    TE.map((token) => {
      // Set the cookie and redirect to /timeline
      const nextResponse = NextResponse.redirect(timelineURL);
      nextResponse.cookies.set("token", JSON.stringify(token), {
        secure: process.env.NODE_ENV === "production", // Set 'secure' only in production
        sameSite: "lax", // Recommended to prevent CSRF attacks
        maxAge: 60 * 60 * 24, // 1 day
      });

      return nextResponse;
    }),
    TE.getOrElse((error) => {
      console.error(error);
      return T.of(NextResponse.redirect(homeURL));
    })
  );
};

// eslint-disable-next-line max-statements
export const middleware = async (
  request: NextRequest
): Promise<NextResponse> => {
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

      const task = saveCode(newCode, { timelineURL, homeURL });

      return await task();
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
      // TODO: handle expired cookies
      request.cookies.delete("code");

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
