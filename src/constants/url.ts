const DEFAULT_PORT = 3000;

export const APP_BASE_URL = `http://${
  process.env.NEXT_PUBLIC_VERCEL_URL ??
  `localhost:${process.env.PORT ?? DEFAULT_PORT}`
}`;
