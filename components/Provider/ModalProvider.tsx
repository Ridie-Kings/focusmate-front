"use client";
import { createContext, useState, useEffect } from "react";
import { ModalContextType } from "@/interfaces/Modal/ModalType";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { getMyProfile } from "@/services/Profile/getMyProfile";
import { tempTaskType } from "@/interfaces/Modal/ModalType";

import Modal from "../Elements/General/Modal";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export type ModalItemType = {
  type: string;
  item: tempTaskType | ContactForm | Record<string, unknown>;
};

export const ModalContext = createContext<ModalContextType>({
  isOpen: { text: "", other: undefined },
  setIsOpen: () => {},
  profile: null,
});

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState({ text: "" });
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
    isOpen,
    setIsOpen,
    profile,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {isOpen.text !== "" && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} profile={profile} />
      )}
      {children}
    </ModalContext.Provider>
  );
}
