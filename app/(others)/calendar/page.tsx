import Calendar from "@/components/Pages/Calendar";
import CalendarProvider from "@/components/Provider/CalendarProvider";

export default function page() {
  return (
    <CalendarProvider>
      <Calendar />
    </CalendarProvider>
  );
}
