import { Dispatch, SetStateAction } from "react";
import InputModal from "@/components/Reusable/InputModal";
import { Calendar, Text, Timer } from "lucide-react";
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import ModalDatePicker from "../ModalDatePicker/ModalDatePicker";
import ModalTimePicker from "../ModalTimePicker/ModalTimePicker";
import { tempEventType } from "@/interfaces/Modal/ModalType";
import { useLocale, useTranslations } from "next-intl";

export default function BodyInputs({
  error,
  event,
  setEvent,
  setError,
  date,
}: {
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  event: tempEventType;
  setEvent: Dispatch<SetStateAction<tempEventType>>;
  date: Date;
}) {
  const tCommon = useTranslations("Common");
  const locale = useLocale();

  return (
    <div className="flex flex-col gap-6 w-full">
      <InputModal
        defaultValue={event.description}
        onChange={(e) =>
          setEvent((prev) => ({ ...prev, description: e.target.value }))
        }
        type="text"
        placeholder={tCommon("description")}
        icon={<Text />}
      />
      {/* <InputModal
        type="select"
        placeholder="10 min. antes"
        option={
          <div className="absolute top-7 flex flex-col bg-background-primary drop-shadow-lg rounded-lg p-2 gap-1 z-50">
            {["10", "15", "20"]?.map((item) => (
              <option key={item} className="p-2">
                {item} min. antes
              </option>
            ))}
          </div>
        }
        icon={<Bell />}
      /> */}
      <InputModal
        type="select"
        placeholder={format(event.startDate ?? new Date(), "dd MMMM yyyy", {
          locale: locale === "es" ? es : enUS,
        })}
        option={
          <ModalDatePicker
            date={date}
            onChange={(e) => {
              setEvent((prev) => ({
                ...prev,
                startDate: new Date(e.target.value as string),
                endDate: new Date(e.target.value as string),
              }));
            }}
          />
        }
        propagand={false}
        icon={<Calendar />}
      />
      <div className="flex">
        <InputModal
          type="select"
          placeholder={format(event.startDate ?? new Date(), "HH:mm", {
            locale: locale === "es" ? es : enUS,
          })}
          option={
            <ModalTimePicker
              defaultValue={event.startDate}
              onChange={(e) => {
                const newStartDate = new Date(event.startDate ?? new Date());
                newStartDate.setHours(
                  e.target.value.hours,
                  e.target.value.min,
                  0,
                  0
                );
                setEvent((prev) => ({
                  ...prev,
                  startDate: newStartDate,
                }));
                if (error) setError(null);
              }}
            />
          }
          icon={<Timer />}
          propagand={true}
        />
        <InputModal
          type="select"
          placeholder={format(event.endDate ?? new Date(), "HH:mm", {
            locale: es,
          })}
          option={
            <ModalTimePicker
              defaultValue={event.endDate}
              onChange={(e) => {
                const newEndDate = new Date(event.endDate ?? new Date());
                newEndDate.setHours(
                  e.target.value.hours,
                  e.target.value.min,
                  0,
                  0
                );

                setEvent((prev) => ({
                  ...prev,
                  endDate: newEndDate,
                }));
                if (error) setError(null);
              }}
            />
          }
          icon={<Timer />}
          propagand={true}
        />
      </div>
    </div>
  );
}
