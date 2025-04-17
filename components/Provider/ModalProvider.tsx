"use client";
import { createContext, useState, useEffect } from "react";
import { ModalContextType } from "@/interfaces/Modal/ModalType";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { getMyProfile } from "@/services/Profile/getMyProfile";

import Modal from "../Elements/General/Modal";

export const ModalContext = createContext<ModalContextType>({
  isOpen: "",
  setIsOpen: () => {},
  item: null,
  setItem: () => {},
  profile: null,
});

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState("");
  const [item, setItem] = useState<unknown>();
  const [profile, setProfile] = useState<ProfileType | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getMyProfile();
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const contextValue = {
    item,
    isOpen,
    setIsOpen,
    setItem,
    profile,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {isOpen !== "" && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} setItem={setItem} profile={profile} />
      )}
      {children}
    </ModalContext.Provider>
  );
}
