import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();

  const localeFromCookie = cookieStore.get("NEXT_LOCALE")?.value;

  const locale =
    localeFromCookie === "en" || localeFromCookie === "es"
      ? localeFromCookie
      : "es";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
