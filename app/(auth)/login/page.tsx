"use client";

import { AuthForm } from "@/components/Elements/Auth/AuthForm";

export default function LoginPage() {
  const handleSubmit = async (data: Record<string, string>) => {
    console.log("Login data:", data);
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <AuthForm type="login" onSubmit={handleSubmit} />
    </main>
  );
}
