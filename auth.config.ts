// auth.config.ts  (project root)
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login', // use your own login page instead of the Auth.js default
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            const path = nextUrl.pathname;
            const isProtected =
                path === '/meetings/new' ||
                (path.startsWith('/meetings/') && path.endsWith('/edit'));
            if (isProtected) {
                if (isLoggedIn) return true;
                return false; // redirects to /login
            }

            // Redirect already-logged-in users away from the login page
            if (isLoggedIn && path === '/login') {
                return Response.redirect(new URL('/meetings', nextUrl));
            }

            return true;
        },
    },
    providers: [], // providers are added in auth.ts
} satisfies NextAuthConfig;