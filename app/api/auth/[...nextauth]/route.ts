import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// How many times the admin password can be used total (2 sessions max)
const MAX_LOGIN_USES = 3;
let adminLoginCount = 0;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@gilbreathe.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Secure manual login
        const ADMIN_EMAIL = "admin@gilbreathe.com";
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "GilbreatheSecure18M!";

        // If the max number of sessions has been used, block all further logins
        if (adminLoginCount >= MAX_LOGIN_USES && credentials?.email === ADMIN_EMAIL) {
          throw new Error(`This account has been used ${MAX_LOGIN_USES} times and is now permanently locked.`);
        }

        if (credentials?.email === ADMIN_EMAIL && credentials?.password === ADMIN_PASSWORD) {
          // Increment the counter on each successful login
          adminLoginCount += 1;

          return {
            id: "1",
            name: "GILBREATHE JEWELRY LLC",
            email: credentials.email,
          };
        }
        
        // If email/password don't match exactly, reject the login
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60, // Self-destructs the session after exactly 2 minutes
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };
