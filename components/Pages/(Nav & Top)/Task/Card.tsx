// import { Clock } from "lucide-react";
// import { DropIndicator } from "./dropIndicator";
// import { motion } from "motion/react";
// import PriorityBadge from "@/components/Elements/General/PriorityBadge";
// import Divider from "@/components/Elements/General/Divider";
// import { DragEvent } from "react";
// import { CardProps } from "@/interfaces/Task/TaskType";

// export const Card = ({
//   title,
//   _id,
//   status,
//   dueDate,
//   priority,
//   handleDragStart,
// }: CardProps) => {
//   return (
//     <>
//       <DropIndicator beforeId={_id} status={status} />
//       <motion.div
//         layout
//         layoutId={_id}
//         draggable="true"
//         onPointerDown={(e) => {
//           e.currentTarget.setPointerCapture(e.pointerId);
//           handleDragStart(e as unknown as DragEvent, {
//             title,
//             _id,
//             status,
//             dueDate,
//             priority,
//             userId: "",
//             description: "",
//             isDeleted: false,
//             tags: [],
//             category: "",
//             subTasks: [],
//             startDate: new Date(),
//             endDate: new Date(),
//             color: "#248277",
//           });
//         }}
//         className="cursor-grab rounded border flex bg-white flex-col gap-4 border-gray-100 border-l-6 text-gray-100 p-4 active:cursor-grabbing"
//       >
//         <div className="flex place-content-between">
//           <div className="flex gap-2">
//             <Clock />{" "}
//             {dueDate instanceof Date
//               ? dueDate.toLocaleDateString("es-ES", {
//                   day: "2-digit",
//                   month: "long",
//                 })
//               : "No date"}{" "}
//           </div>
//           <PriorityBadge priority={priority} status={status} />
//         </div>
//         <Divider />
//         <p className="text-lg">{title}</p>
//       </motion.div>
//     </>
//   );
// };
