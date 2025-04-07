import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function getEventsCalendar() {
  try {
    const token = await getToken();
    const res = await apiConnection.get("events-calendar", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching events calendar:",
      error.response.data.message
    );
    return null;
  }
}
