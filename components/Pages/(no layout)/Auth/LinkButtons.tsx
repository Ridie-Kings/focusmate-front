import { LinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LinkButtons({ type }: { type: string }) {
  const t = useTranslations("Auth");

  const generateRandomState = () => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      ""
    );
  };

  const initiateGoogleLogin = () => {
    const googleAuthBaseUrl = "https://sherp-app.com/api/v0/auth/google";

    const state = generateRandomState();
    sessionStorage.setItem("googleOAuthState", state);
    const params = new URLSearchParams({
      state,
    });
    const loginUrl = `${googleAuthBaseUrl}?${params.toString()}`;
    window.location.href = loginUrl;
  };

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <div className="flex w-full items-center gap-2">
        <div className="flex-1 h-[1px] bg-black" />
        <p className="font-light">{t(`${type}.or`)}</p>
        <div className="flex-1 h-[1px] bg-black" />
      </div>
      <button
        onClick={initiateGoogleLogin}
        className="flex-1 w-full active:bg-primary-500 hover:bg-primary-700 hover:text-white active:text-white border border-primary-500 px-2 py-4 rounded-2xl flex items-center justify-center gap-4 transition-colors duration-300 cursor-pointer"
      >
        <p>{t(`${type}.google`)}</p>
        <LinkIcon size={20} />
      </button>
    </div>
  );
}
