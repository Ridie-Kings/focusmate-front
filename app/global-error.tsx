"use client";
import { logout } from "@/lib";
import Image from "next/image";
import { useEffect } from "react";

export default function globalError() {
  useEffect(() => {
    const handleRemoveTokens = async () => {
      setTimeout(async () => {
        await logout();
      }, 1000);
    };
    handleRemoveTokens();
  }, []);

  return (
    <html>
      <body className="flex items-center justify-center w-screen h-screen">
        <Image src={"/images/tenor.gif"} width={480} height={480} alt="error" />
      </body>
    </html>
  );
}
