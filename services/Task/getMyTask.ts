import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";
import { TaskType } from "@/interfaces/Task/TaskType";

export async function getMyTask(): Promise<TaskType[]> {
  try {
    const token = await getToken();

    const res = await apiConnection.get("tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    console.error("Error fetching tasks:", error.response.data.message);
    return [];
  }
}
