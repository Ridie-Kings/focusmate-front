"use server";

import { apiClient } from "../api";

export async function addTaskToCalendar({ _id }: { _id: string }): Promise<{
  success: boolean;
  res: any;
}> {
  try {
    const res = await apiClient.patch(`calendar/addTask/${_id}`, {
      taskId: _id,
    });

    return { success: true, res };
  } catch (error: any) {
    console.error("Error adding task to calendar:", error);

    return { success: false, res: error.message };
  }
}
