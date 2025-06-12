"use client";
import { useEffect } from "react";
import { useInitProfile } from "@/stores/profileStore";

export default function UserProfileInitializer() {
  const initProfile = useInitProfile();

  useEffect(() => {
    initProfile();
  }, []);

  return null;
}
