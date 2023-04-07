import { NextRequest } from "next/server";

export const getHostURI = (request: NextRequest): string => {
  // Construct the absolute URL for the /timeline route
  const protocol = request.headers.get("x-forwarded-proto") ?? "http";
  const host = request.headers.get("host");
  return `${protocol}://${host}`;
};
