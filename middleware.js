// middleware.js
import { clerkMiddleware } from "@clerk/nextjs/server"; // ✅ Correct import

export default clerkMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"], // ✅ Allow unauthenticated access to these
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // ✅ Don't apply middleware to static assets
};
