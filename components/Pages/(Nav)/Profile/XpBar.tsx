"use client";
import { useProfile } from "@/stores/profileStore";

export default function XpBar() {
  const profile = useProfile();

  return (
    <div className="flex gap-2 items-center mb-4">
      <div className="flex-1 bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${((profile?.xp ?? 0) / 1295) * 100}%` }}
        />
      </div>
      <p className="text-sm text-gray-600">{profile?.xp ?? 0} / 1295 XP</p>
    </div>
  );
}
