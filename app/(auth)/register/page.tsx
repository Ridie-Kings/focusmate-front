"use client";

import { AuthForm } from "@/components/Elements/Auth/AuthForm";

export default function RegisterPage() {
  const handleSubmit = async (data: Record<string, string>) => {
    console.log("Register data:", data);
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <AuthForm type="register" onSubmit={handleSubmit} />
    </main>
  );
}
