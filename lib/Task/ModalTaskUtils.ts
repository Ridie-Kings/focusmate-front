import { tempTaskType } from "@/interfaces/Modal/ModalType";
import { useTranslations } from "next-intl";

export default function ModalTaskUtils({ task }: { task: tempTaskType }) {
  const tDashboard = useTranslations("Dashboard.tasks");

  const trad = () => {
    const priorityMap = {
      high: tDashboard("priority.high"),
      medium: tDashboard("priority.medium"),
      low: tDashboard("priority.low"),
    };

    return priorityMap[task.priority] || "";
  };

  return {
    trad,
  };
}
