import { withAuth } from "next-auth/middleware";
import createMiddleware from 'next-intl/middleware';
import {pathnames, locales, localePrefix, localeDetection} from './config';
import { NextRequest } from "next/server";

const adminPages = ['/admin'] // dodawać wszystkie admin page
const protectedPages = ['/dashboard'] // dodawać wszystkie protected page
export const excludePaths = [...adminPages, ...protectedPages, '/blog/[slug]', '/tags/[tag]'];
export const defaultLocale = 'en' as const;

export const intlMiddleware =  createMiddleware({
  defaultLocale: defaultLocale,
  locales,
  pathnames,
  localeDetection,
  localePrefix
});

// Middleware dla uzytkowników zalogowanych 
const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({token}) => token != null
    },
    pages: {
      signIn: `/login`
    }
  }
);

// Middleware dla użytkowników Administracyjnych
const adminMidleware = withAuth(
  {
  callbacks: {
        authorized: ({ token }) => {
          return token?.role === "admin"
        }
    },
    pages: {
      signIn: `/`
    }
})

export default function middleware(req: NextRequest) {

  /* Dopasowanie do chronionych tras */
  const ProtectedPathnameRegexp = RegExp(
    `^(/(${locales.join('|')}))?(${protectedPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );

  /* Dopasowanie do chronionych tras administracyjnych */
  const AdminPathnameRegexp = RegExp(
    `^(/(${locales.join('|')}))?(${adminPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );

  /* Sprawdzenie czy trasa jest dostępna tylko dla admina */
  if (AdminPathnameRegexp.test(req.nextUrl.pathname)) {
    return (adminMidleware as any)(req);
  }
  
  /* Sprawdzenie czy trasa jest dostępna tylko dla zalogowanego uzytkownika */
  if (ProtectedPathnameRegexp.test(req.nextUrl.pathname)) {
     return (authMiddleware as any)(req);
  } else {
    return intlMiddleware(req);
  }
}

export const config = {
  matcher: ["/((?!api/|_next/|_proxy/|_vercel|_static|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)"]
};