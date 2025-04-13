// filepath: c:\Users\rafik\Desktop\banner-app\middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import i18nConfig from "./src/i18n/i18nConfig";

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

	if (req.method === "GET") {
		const response = NextResponse.next();
		const token = req.cookies.get("session")?.value ?? null;
		if (token !== null) {
			// Only extend cookie expiration on GET requests since we can be sure
			// a new session wasn't set when handling the request.
			response.cookies.set("session", token, {
				path: "/",
				maxAge: 60 * 60 * 24 * 30,
				sameSite: "lax",
				httpOnly: true,
				secure: process.env.NODE_ENV === "production"
			});
		}
		return response;
	}

	const originHeader = req.headers.get("Origin");
	// NOTE: You may need to use `X-Forwarded-Host` instead
	const hostHeader = req.headers.get("Host");
	if (originHeader === null || hostHeader === null) {
		return new NextResponse(null, {
			status: 403
		});
	}
	let origin: URL;
	try {
		origin = new URL(originHeader);
	} catch {
		return new NextResponse(null, {
			status: 403
		});
	}
	if (origin.host !== hostHeader) {
		return new NextResponse(null, {
			status: 403
		});
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next|favicon.ico|robots.txt|.*\\..*).*)"]
};
