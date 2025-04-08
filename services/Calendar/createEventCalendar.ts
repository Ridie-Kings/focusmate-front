import { getToken } from "@/lib";
import { apiConnection } from "../axiosConfig";

export async function createEventCalendar() {
  try {
    const token = await getToken();
    // const res = await apiConnection.post(
    //   "events-calendar",
    //   {
    //     title: "Meeting",
    //     description: "Meeting with the team",
    //     location: "Office",
    //     startDate: "2021-12-31T23:59:59",
    //     endDate: "2021-12-31T23:59:59",
    //     category: "General",
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // return res.data;
    return [];
  } catch (error: any) {
    console.error("Error creating calendar event:", error);
    return null;
  }
}
