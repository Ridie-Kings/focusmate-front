"use server";
import { apiClient } from "../api";
import { CalendarType } from "@/interfaces/Calendar/CalendarType";

export async function getCalendarByDate({ date }: { date: string }): Promise<{
  success: boolean;
  res: CalendarType;
}> {
  try {
    const res = await apiClient.get(`calendar/${date}`);

    return { success: true, res: res.events };
  } catch (error: any) {
    console.error(`Error fetching calendar of ${date}:`, error);

    return { success: false, res: error.message };
  }
}
