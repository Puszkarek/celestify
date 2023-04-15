const DEFAULT_PORT = 3000;

// TODO: make it dynamic
export const APP_BASE_URL = `http://localhost:${
  process.env.PORT ?? DEFAULT_PORT
}`;
