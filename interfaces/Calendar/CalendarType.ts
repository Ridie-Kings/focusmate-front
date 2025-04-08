import { Dispatch, SetStateAction } from "react";

export type CalendarContextType = {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
};

export type CategoriesProps = {
  items?: string[];
};
