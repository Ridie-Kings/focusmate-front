import { Dispatch, SetStateAction } from 'react';
import { ProfileType } from '@/interfaces/Profile/ProfileType';

export type ModalContextType = {
  isOpen: string;
  setIsOpen: Dispatch<SetStateAction<string>>;
  item: unknown;
  setItem: (item: unknown) => void;
  profile: ProfileType | null;
};
