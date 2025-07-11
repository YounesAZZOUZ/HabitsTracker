// middleware.js
import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"], // Add any public routes here
});

export const config = {
  matcher: [
    // Match all paths except static and API files
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
