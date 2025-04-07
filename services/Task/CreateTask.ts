"use server";
import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";
import { start } from "node:repl";

export async function CreateTask(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const token = await getToken();

    const startDate = new Date("2025-02-24T00:00:00Z");
    const endDate = new Date("2025-02-28T23:59:59Z");
    const dueDate = new Date("2025-02-28T23:59:59Z");

    const res = await apiConnection.post(
      "tasks",
      {
        title: "Task",
        description: "Description",
        status: "completed",
        startDate,
        endDate,
        dueDate,
        tags: ["tag1", "tag2"],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, message: res.data.message };
  } catch (error: any) {
    console.error(
      "Error creating task:",
      error.response?.data || error.response || error
    );
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Unknown error",
    };
  }
}
