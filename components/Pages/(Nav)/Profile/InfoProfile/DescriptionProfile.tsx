"use client";

import { useState } from "react";

import { ProfileType } from "@/interfaces/Profile/ProfileType";

import NavigationStats from "./DescriptionProfile/NavigationStats";
import MembershipUser from "./DescriptionProfile/MembershipUser/MembershipUser";
import AcademicUser from "./DescriptionProfile/AcademicUser/AcademicUser";
import InformationUser from "./DescriptionProfile/InformationUser/InformationUser";

export default function DescriptionProfile({
  profile,
}: {
  profile: ProfileType | null;
}) {
  const [selectedPage, setSelectedPage] = useState<
    "info" | "academic" | "member"
  >("info");

  return (
    <div className="w-3/4 flex flex-col p-6 gap-6 border border-primary-200 bg-background-primary rounded-2xl">
      <NavigationStats
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      {selectedPage === "member" ? (
        <MembershipUser />
      ) : selectedPage === "academic" ? (
        <AcademicUser />
      ) : (
        <InformationUser profile={profile} />
      )}
    </div>
  );
}
