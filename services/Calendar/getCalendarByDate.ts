"use server";
import { apiClient } from "../api";
import { PromiseCalendar } from "@/interfaces/Calendar/CalendarType";

export async function getCalendarByDate({ date }: { date: string }): Promise<{
  success: boolean;
  res: PromiseCalendar;
}> {
  try {
    const res = await apiClient.get(`calendar/${date}`);

    return { success: true, res };
  } catch (error: any) {
    console.error(`Error fetching calendar of ${date}:`, error);

    return { success: false, res: error.message };
  }
}
