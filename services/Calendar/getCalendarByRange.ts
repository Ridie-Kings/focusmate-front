"use server";
import { apiClient } from "../api";
import { CalendarType } from "@/interfaces/Calendar/CalendarType";

export async function getCalendarByRange({
  firstDate,
  secondDate,
}: {
  firstDate: Date;
  secondDate: Date;
}): Promise<{
  success: boolean;
  res: CalendarType;
}> {
  try {
    const firstDateString = firstDate.toISOString().split("T")[0];
    const secondDateString = secondDate.toISOString().split("T")[0];

    const res = await apiClient.get(
      `calendar/${firstDateString}/${secondDateString}`
    );

    return { success: true, res: res.events };
  } catch (error: any) {
    console.error(`Error fetching calendar by range:`, error);

    return { success: false, res: error.message };
  }
}
