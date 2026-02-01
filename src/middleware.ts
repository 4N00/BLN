import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["en", "nl"],
  defaultLocale: "en",
  localePrefix: "never"
});

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/",
    "/(en|nl)/:path*"
  ]
};
