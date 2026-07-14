import { withAuth } from "next-auth/middleware";

export const proxy = withAuth({
  pages: {
    signIn: "/login",
  },
});

export default proxy;

export const config = {
  matcher: [
    '/((?!login|api|_next/static|_next/image|favicon.ico).*)',
  ],
};
