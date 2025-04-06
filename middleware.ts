// filepath: c:\Users\rafik\Desktop\banner-app\middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import i18nConfig from './src/i18n/i18nConfig';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const supportedLocales = i18nConfig.supportedLngs;

  const pathnameIsMissingLocale = supportedLocales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale && !PUBLIC_FILE.test(pathname)) {
    const defaultLocale = i18nConfig.fallbackLng;
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|robots.txt|.*\\..*).*)',
  ],
};