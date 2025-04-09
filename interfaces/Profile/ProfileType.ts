import { UserType } from "../User/UserType";

export type ProfileType = {
  avatar: string;
  banner: string;
  bio: string;
  coins: number;
  createdAt: string;
  directRewards: [];
  frame: string;
  level: number;
  title: string;
  unlockedBadges: [];
  updatedAt: Date;
  user: UserType;
  xp: number;
  _id: string;
};
