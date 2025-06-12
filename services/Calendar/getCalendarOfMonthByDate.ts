"use server";
import { endOfMonth } from "date-fns";
import { startOfMonth } from "date-fns";
import { endOfWeek } from "date-fns";
import { startOfWeek } from "date-fns";
import { apiClient } from "../api";
import { CalendarType } from "@/interfaces/Calendar/CalendarType";

export async function getCalendarOfMonthByDate({
  date,
}: {
  date: Date;
}): Promise<{
  success: boolean;
  res: CalendarType;
}> {
  try {
    const firstDate = startOfWeek(startOfMonth(date));
    const secondDate = endOfWeek(endOfMonth(date));

    const res = await apiClient.get(
      `calendar/${firstDate.toISOString().split("T")[0]}/${
        secondDate.toISOString().split("T")[0]
      }`
    );

    return { success: true, res: res };
  } catch (error: any) {
    console.error(`Error fetching calendar by range:`, error);

    return { success: false, res: error.message };
  }
}
