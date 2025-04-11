import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";
import { TaskType } from "@/interfaces/Task/TaskType";

export async function getMyTask(): Promise<{
  success: boolean;
  res: TaskType[];
}> {
  try {
    const token = await getToken();

    const res = await apiConnection.get("tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, res: res?.data };
  } catch (error: any) {
    console.error("Error fetching tasks:", error.response?.data);
    return { success: false, res: error.response?.data };
  }
}
