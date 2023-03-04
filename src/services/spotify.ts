import NextAuth, { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const AUTH_OPTIONS: AuthOptions = {
  providers: [
    SpotifyProvider({
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private",
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    session: async ({ session, user }) => {
      session.user = user;
      return session;
    },
  },
};

export default NextAuth(AUTH_OPTIONS);
