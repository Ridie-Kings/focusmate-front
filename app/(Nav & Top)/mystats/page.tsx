import MyStats from "@/components/Pages/(Nav & Top)/MyStats";
import { GetUserLogs } from "@/services/User/GetUserLogs";

export default async function page() {
  const stats = await GetUserLogs();

  return <MyStats stats={stats.res} />;
}
