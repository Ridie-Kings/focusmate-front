import { Dispatch, SetStateAction } from 'react';

export type ModalContextType = {
  isOpen: string;
  setIsOpen: Dispatch<SetStateAction<string>>;
  item: unknown;
  setItem: (item: unknown) => void;
};
