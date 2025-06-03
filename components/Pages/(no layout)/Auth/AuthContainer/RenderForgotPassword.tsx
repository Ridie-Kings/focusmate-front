import { useTranslations } from "next-intl";
import Link from "next/link";

export default function RenderForgotPassword({ type }: { type: string }) {
  const t = useTranslations("Auth");
  if (type === "login")
    return (
      <Link href="/passwordrecovery" className="underline">
        {t("login.forgotPassword")}
      </Link>
    );
  else return;
}
