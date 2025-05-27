"use server";

import { apiClient } from "../../lib/api";

export async function addTaskToCalendar({ _id }: { _id: string }): Promise<{
  success: boolean;
  res: any;
}> {
  try {
    const res = await apiClient.patch(`calendar/${_id}/add-task`, {
      taskId: _id,
    });

    return { success: true, res };
  } catch (error: any) {
    console.error("Error creating calendar event:", error.message);
    return { success: false, res: error.message };
  }
}
