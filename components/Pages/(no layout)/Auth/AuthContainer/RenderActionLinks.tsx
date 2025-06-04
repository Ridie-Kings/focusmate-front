import { useTranslations } from "next-intl";
import Link from "next/link";

export default function RenderActionLinks({ type }: { type: string }) {
  const t = useTranslations("Auth");
  if (type === "login")
    return (
      <Link href="/register" className="underline">
        <p>
          {t("login.noAccount")} {t("login.signUp")}
        </p>
      </Link>
    );
  else
    return (
      <Link href="/login" className="underline">
        <p>
          {t("register.haveAccount")} {t("register.signIn")}
        </p>
      </Link>
    );
}
