import Button from "@/components/Reusable/Button";
import InputModal from "@/components/Reusable/InputModal";
import { createHabit } from "@/services/Habits/createHabit";
import { Dispatch, SetStateAction, useState } from "react";
import { AudioLines, BookHeart, Text } from "lucide-react";
import { HabitsType } from "@/interfaces/Habits/HabitsType";

export default function ModalHabit({
  setIsOpen,
  setItem,
}: {
  setIsOpen: Dispatch<SetStateAction<string>>;
  setItem: (data: { type: string; item: HabitsType }) => void;
}) {
  const [habit, setHabit] = useState<{
    name: string;
    description: string;
    frequency: "daily" | "weekly" | "monthly" | "";
    type: string;
  }>({
    name: "",
    description: "",
    frequency: "",
    type: "",
  });

  const handleCreateHabit = async () => {
    const res = await createHabit({ habit });

    if (res.success) {
      setItem({ type: "habit", item: res.res });
      setIsOpen("");

      console.log("habit created", res.res);
    } else {
      console.log("habit error", res.res);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <input
          type="text"
          placeholder="Titulo"
          className="text-2xl text-gray-500 outline-none"
          onChange={(e) =>
            setHabit((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <div className="flex flex-col gap-6 w-full">
          <InputModal
            onChange={(e) =>
              setHabit((prev) => ({ ...prev, description: e.target.value }))
            }
            type="text"
            placeholder="Descripcion"
            icon={<Text />}
          />
          <InputModal
            type="select"
            placeholder={
              habit.frequency !== "" ? habit.frequency : "Frequencia"
            }
            option={
              <div className="absolute top-7 flex flex-col bg-background-primary drop-shadow-lg rounded-lg p-2 gap-1 z-50">
                {[
                  { link: "Diario", label: "daily" },
                  { link: "Semanal", label: "weekly" },
                  { link: "Cada Mes", label: "monthly" },
                ]?.map((item) => (
                  <option
                    onClick={() => {
                      setHabit((prev) => ({
                        ...prev,
                        frequency: item.label as
                          | ""
                          | "daily"
                          | "weekly"
                          | "monthly",
                      }));
                    }}
                    key={item.label}
                    className="p-2"
                  >
                    {item.link}
                  </option>
                ))}
              </div>
            }
            icon={<AudioLines />}
          />
          <InputModal
            onChange={(e) =>
              setHabit((prev) => ({ ...prev, type: e.target.value }))
            }
            type="select"
            placeholder={habit.type !== "" ? habit.type : "Tipo of habito"}
            option={
              <div className="absolute top-7 flex flex-col bg-background-primary drop-shadow-lg rounded-lg p-2 px-5 gap-1">
                {[
                  { label: "study", link: "Estudio" },
                  { label: "sport", link: "Deporte" },
                  { label: "food", link: "Comida" },
                  { label: "drink", link: "Beber" },
                  { label: "work", link: "Trabajo" },
                ]?.map((item) => (
                  <option
                    onClick={() => {
                      setHabit((prev) => ({
                        ...prev,
                        type: item.label,
                      }));
                    }}
                    key={item.link}
                    className="p-2"
                  >
                    {item.link}
                  </option>
                ))}
              </div>
            }
            icon={<BookHeart />}
          />
        </div>
        <div className="flex py-2 gap-2.5">
          <Button
            size="large"
            button="secondary"
            type="button"
            onClick={() => setIsOpen("")}
          >
            Cancelar
          </Button>
          <Button
            size="large"
            onClick={handleCreateHabit}
            button="primary"
            type="button"
          >
            Guardar
          </Button>
        </div>
      </div>
    </>
  );
}
