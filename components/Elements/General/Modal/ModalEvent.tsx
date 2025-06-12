import { Dispatch, SetStateAction, useEffect, useState, useMemo } from "react";
import { AlertCircle } from "lucide-react";

import BodyInputs from "./ModalEvent/BodyInputs";
import BtnSend from "./Modal/BtnSend";
import TopInputsEvents from "./Modal/TopInputsEvents";
import { tempEventType } from "@/interfaces/Modal/ModalType";
import { TypeIsOpen } from "@/interfaces/Modal/ModalType";
import ModalEventUtils from "@/lib/ModalEventUtils";

type ModalEventProps = {
  events: tempEventType;
  setIsOpen: Dispatch<SetStateAction<TypeIsOpen>>;
  handleClose: () => void;
};

const DEFAULT_EVENT: tempEventType = {
  _id: undefined,
  title: "",
  description: "",
  location: "",
  startDate: new Date(),
  endDate: new Date(),
  duration: 1,
  category: "General",
  color: "",
  recurrence: {
    frequency: "none",
    interval: 0,
    daysOfWeek: [],
    endDate: new Date(),
    maxOccurrences: 0,
  },
};

export default function ModalEvent({
  setIsOpen,
  events,
  handleClose,
}: ModalEventProps) {
  const initialDate = useMemo(
    () => (events instanceof Date ? events : new Date()),
    [events]
  );

  const [event, setEvent] = useState<tempEventType>({
    ...DEFAULT_EVENT,
    startDate: initialDate,
    endDate: initialDate,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { handleCreateEvent, handleUpdateEvent } = ModalEventUtils({
    setError,
    event,
    setIsLoading,
    handleClose,
  });

  useEffect(() => {
    if (events && events instanceof Object && "title" in events) {
      setEvent(() => ({
        ...(events as tempEventType),
      }));
    }
  }, [events]);

  const isEditMode = Boolean(event._id);

  return (
    <div className="flex flex-col gap-2 w-full">
      <TopInputsEvents
        error={error}
        setError={setError}
        event={event}
        setEvent={setEvent}
      />

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <BodyInputs
        date={initialDate}
        error={error}
        setError={setError}
        event={event}
        setEvent={setEvent}
      />

      <BtnSend
        text={isEditMode ? "Modificar" : undefined}
        loadingText={isEditMode ? "Modificando..." : undefined}
        handleClick={isEditMode ? handleUpdateEvent : handleCreateEvent}
        isLoading={isLoading}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
