"use server";
import { apiClient } from "../api";
import { PromiseCalendar } from "@/interfaces/Calendar/CalendarType";

export async function getCalendarByRange({
  firstDate,
  secondDate,
}: {
  firstDate: Date;
  secondDate: Date;
}): Promise<{
  success: boolean;
  res: PromiseCalendar;
}> {
  try {
    const res = await apiClient.get(
      `calendar/${firstDate.toISOString().split("T")[0]}/${
        secondDate.toISOString().split("T")[0]
      }`
    );

    return { success: true, res };
  } catch (error: any) {
    console.error(`Error fetching calendar:`, error);
    return { success: false, res: error.message };
  }
}
