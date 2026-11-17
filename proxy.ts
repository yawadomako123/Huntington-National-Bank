import { withAuth } from "next-auth/middleware";

export const proxy = withAuth({
  pages: {
    signIn: "/login",
  },
});

export default proxy;

export const config = {
  matcher: [
    // Protect app routes, but let the login/open-account pages, API routes,
    // Next internals, and any static/metadata file (anything with a ".") through.
    '/((?!login|open-account|api|_next/static|_next/image|.*\\.).*)',
  ],
};
