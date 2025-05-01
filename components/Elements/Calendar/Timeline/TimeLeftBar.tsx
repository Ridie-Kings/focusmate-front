import { ModalContext } from "@/components/Provider/ModalProvider";
import Menu from "@/components/Reusable/Menu";
import { StatusType, TaskType } from "@/interfaces/Task/TaskType";
import AgendaUtils from "@/lib/AgendaUtils";
import TaskUtils from "@/lib/TaskUtils";
import { Check, Pen, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useContext } from "react";

export default function TimelineCard({
	event,
	setEvents,
	setTasks,
}: {
	setTasks: Dispatch<SetStateAction<TaskType[]>>;
	event: TaskType;
	setEvents: Dispatch<SetStateAction<TaskType[]>>;
}) {
	const { isLightColor, getDarkerColor, formatDuration } = AgendaUtils();
	const { handleChangeStatus, handleDeleteTask } = TaskUtils({
		setEvents,
		setTasks,
	});
	const { setIsOpen } = useContext(ModalContext);

	const textColor = isLightColor(event.color) ? "text-black" : "text-white";
	const darkerColor = getDarkerColor(event.color);

	return (
		<div
			style={{
				backgroundColor:
					event.status === "completed" ? "" : event.color,
			}}
			className={`w-full h-26 p-4 rounded-lg relative flex flex-col justify-between transition-all duration-300 ease-in-out ${textColor} ${
				event.status === "completed" ? "border-2 border-gray-500" : ""
			}`}
		>
			<p className="font-medium">{event.title}</p>
			<div className="flex items-center justify-between w-full">
				<span className="flex flex-col items-center gap-1">
					<p className="text-sm">
						{new Date(event.startDate).toLocaleTimeString("es-ES", {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</p>
					<p className={`text-xs font-medium ${textColor}`}>
						Empieza
					</p>
				</span>
				<p
					style={{ backgroundColor: darkerColor }}
					className="px-2 h-3/4 font-medium text-xs flex items-center rounded-sm text-white"
				>
					{event.status === "completed"
						? "Terminado"
						: formatDuration(event.startDate, event.endDate)}
				</p>
				<span className="flex flex-col items-center gap-1">
					<p className="text-sm">
						{new Date(event.endDate).toLocaleTimeString("es-ES", {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</p>
					<p className={`text-xs font-medium ${textColor}`}>
						Termina
					</p>
				</span>
			</div>

			<Menu
				className="absolute right-3 top-4"
				items={[
					{
						label: "Modificar",
						icon: <Pen size={20} />,
						onClick: () =>
							setIsOpen({ text: "event", other: event }),
					},
					{
						label: "Hecho",
						icon: <Check size={20} />,
						onClick: () =>
							handleChangeStatus(
								event.status === "completed"
									? ("dropped" as StatusType)
									: ("completed" as StatusType),
								event._id
							),
					},
					{
						label: "Eliminar",
						color: "red",
						icon: <Trash2 size={20} />,
						onClick: () => handleDeleteTask(event._id),
					},
				]}
			/>
		</div>
	);
}
