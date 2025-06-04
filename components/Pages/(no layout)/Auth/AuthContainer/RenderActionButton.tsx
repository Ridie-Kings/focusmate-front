import Button from "@/components/Reusable/Button";
import { useTranslations } from "next-intl";

export default function RenderActionButton({
  type,
  isLoading,
}: {
  type: string;
  isLoading: boolean;
}) {
  const t = useTranslations("Auth");
  if (type === "login")
    return (
      <Button
        size="large"
        type="submit"
        button="primary"
        state={isLoading ? "disabled" : "enabled"}
      >
        {t("login.loginButton")}
      </Button>
    );
  else
    return (
      <Button
        size="large"
        type="submit"
        button="primary"
        state={isLoading ? "disabled" : "enabled"}
      >
        {t("register.registerButton")}
      </Button>
    );
}
