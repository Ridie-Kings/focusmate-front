interface PriorityItem {
  type: string;
  label: string;
  color: string;
}

interface ModalPriorityPickerProps {
  onChange: (e: { target: { value: string } }) => void;
}

export default function ModalPriorityPicker({
  onChange,
}: ModalPriorityPickerProps) {
  const item: PriorityItem[] = [
    { type: "high", label: "Urgente", color: "#ff8d8c" },
    { type: "medium", label: "Importante", color: "#ffbb39" },
    { type: "low", label: "Tranquilo", color: "#aaa3ff" },
    { type: "high", label: "Opcional", color: "#56ab91" },
  ];
  return (
    <div className="absolute top-7 flex flex-col bg-background-primary drop-shadow-lg rounded-lg p-2 gap-1 z-10">
      {item.map((item) => (
        <div key={item.label} className="p-2 flex items-center gap-2">
          <div
            className="size-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <p onClick={() => onChange({ target: { value: item.type } })}>
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
