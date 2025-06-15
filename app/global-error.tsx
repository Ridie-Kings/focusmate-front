"use client";
import { logout } from "@/lib";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GlobalError() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleRemoveTokens = async () => {
      setTimeout(async () => {
        await logout();
        router.push(`/login?redirect=${pathname.split("/")[1]}`);
        router.refresh();
      }, 1000);
    };
    handleRemoveTokens();
  }, [router]);

  return (
    <html>
      <body className="flex items-center justify-center w-screen h-screen">
        <Image
          src={"/images/tenor.gif"}
          width={480}
          height={480}
          alt="error"
          className="mx-auto"
        />
      </body>
    </html>
  );
}
