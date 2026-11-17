import { withAuth } from "next-auth/middleware";

export const proxy = withAuth({
  pages: {
    signIn: "/login",
  },
});

export default proxy;

export const config = {
  matcher: [
    // Protect app routes, but let the login page, API routes, Next internals,
    // and metadata/static files (icon.svg, manifest, favicon, apple-icon…) through.
    '/((?!login|open-account|api|_next/static|_next/image|favicon.ico|icon|apple-icon|manifest|sitemap|robots).*)',
  ],
};
