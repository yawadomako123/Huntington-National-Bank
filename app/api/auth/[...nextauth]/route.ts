import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// In-memory lock for the demo (Warning: resets if Vercel server restarts)
let hasAdminLoggedIn = false;

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

        // If the lock is already triggered, block all manual logins
        if (hasAdminLoggedIn && credentials?.email === ADMIN_EMAIL) {
          throw new Error("This account has already been accessed and is now locked.");
        }

        if (credentials?.email === ADMIN_EMAIL && credentials?.password === ADMIN_PASSWORD) {
          // Trigger the lock so no one can log in again
          hasAdminLoggedIn = true;
          
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
