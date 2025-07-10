// middleware.js
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: ['/', '/sign-in', '/sign-up'], // Allow public pages
});

export const config = {
  matcher: [
    // Protect all routes except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
