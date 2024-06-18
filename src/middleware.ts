import { withAuth } from 'next-auth/middleware'
import createMiddleware from 'next-intl/middleware'
import { pathnames, locales, localePrefix, localeDetection } from './config'
import { NextRequest } from 'next/server'

const adminPages = ['/admin'] // dodawać wszystkie admin page
const LoginAndRegisterPages = ['/login', '/register']
const protectedPages = ['/dashboard', '/dashboard/settings', '/dashboard/demo'] // dodawać wszystkie protected page
const developerPages = [
  '/dashboard/billing',
  '/dashboard/docs',
  '/dashboard/materials',
  '/dashboard/materials/advertising',
  '/dashboard/materials/information',
  '/dashboard/materials/manual',
  '/dashboard/support',
  '/dashboard/webinars',
] // dodawać wszystkie developer page
export const excludePaths = [
  ...adminPages,
  ...protectedPages,
  ...developerPages,
  '/blog/[slug]',
  '/tags/[tag]',
]
export const defaultLocale = 'en' as const

export const intlMiddleware = createMiddleware({
  defaultLocale: defaultLocale,
  locales,
  pathnames,
  localeDetection,
  localePrefix,
})

// Middleware dla uzytkowników zalogowanych
const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req)
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: `/login`,
    },
  }
)

// Middleware dla użytkowników Administracyjnych
const adminMidleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req)
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token?.role === 'admin'
      },
    },
    pages: {
      signIn: `/`,
    },
  }
)

// Middleware dla użytkowników Administracyjnych
const developerMidleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req)
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token?.role === 'developer' || token?.role === 'admin'
      },
    },
    pages: {
      signIn: `/dashboard`,
    },
  }
)

// Middleware dla uzytkowników zalogowanych
const LoginAndRegisterMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req)
  },
  {
    callbacks: {
      authorized: ({ token }) => token == null,
    },
    pages: {
      signIn: `/`,
    },
  }
)

export default function middleware(req: NextRequest) {
  /* Dopasowanie do chronionych tras */
  const ProtectedPathnameRegexp = RegExp(
    `^(/(${locales.join('|')}))?(${protectedPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  )

  /* Dopasowanie do chronionych tras administracyjnych */
  const AdminPathnameRegexp = RegExp(
    `^(/(${locales.join('|')}))?(${adminPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  )

  /* Dopasowanie do tras logowania i rejestracji */
  const LoginAndRegisterPathnameRegexp = RegExp(
    `^(/(${locales.join('|')}))?(${LoginAndRegisterPages.flatMap((p) =>
      p === '/' ? ['', '/'] : p
    ).join('|')})/?$`,
    'i'
  )

  /* Dopasowanie do chronionych tras developera */
  const DeveloperPathnameRegexp = RegExp(
    `^(/(${locales.join('|')}))?(${developerPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  )

  /* Sprawdzenie czy trasa jest dostępna tylko dla admina */
  if (AdminPathnameRegexp.test(req.nextUrl.pathname)) {
    return (adminMidleware as any)(req)
  }

  /* Sprawdzenie czy trasa jest dostępna tylko dla developera i admina */
  if (DeveloperPathnameRegexp.test(req.nextUrl.pathname)) {
    return (developerMidleware as any)(req)
  }

  /* Trasy dla niezalogowanych - blokujemy dla zalogowanych */
  if (LoginAndRegisterPathnameRegexp.test(req.nextUrl.pathname)) {
    return (LoginAndRegisterMiddleware as any)(req)
  }

  /* Sprawdzenie czy trasa jest dostępna tylko dla zalogowanego uzytkownika */
  if (ProtectedPathnameRegexp.test(req.nextUrl.pathname)) {
    return (authMiddleware as any)(req)
  } else {
    return intlMiddleware(req)
  }
}

export const config = {
  matcher: [
    '/((?!api/|_next/|_proxy/|_vercel|_static|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
}
