"use server";

import { apiClient } from "../api";
import { EventType } from "@/interfaces/Calendar/EventType";

export async function updateEvent({
  _id,
  event,
}: {
  _id: string;
  event: any;
}): Promise<{
  success: boolean;
  res: EventType;
}> {
  try {
    const res = await apiClient.patch(`events-calendar/${_id}`, event);

    return { success: true, res };
  } catch (error: any) {
    console.error("Error updating event:", error);

    return { success: false, res: error.message };
  }
}
