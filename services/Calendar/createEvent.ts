"use server";

import { apiClient } from "../api";
import { tempEventType } from "@/interfaces/Modal/ModalType";
import { EventType } from "@/interfaces/Calendar/EventType";

export async function createEvent({
  event,
}: {
  event: tempEventType;
}): Promise<{
  success: boolean;
  res: EventType;
}> {
  try {
    const newEvent = {
      ...event,
      startDate: event.startDate ? event.startDate.toISOString() : undefined,
      endDate: event.endDate ? event.endDate.toISOString() : undefined,
    };

    const res = await apiClient.post("events-calendar", newEvent);

    return { success: true, res };
  } catch (error: any) {
    console.error("Error creating event:", error);

    return { success: false, res: error.message };
  }
}
