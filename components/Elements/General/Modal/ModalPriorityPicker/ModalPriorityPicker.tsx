interface PriorityItem {
  type: string;
  label: string;
}

interface ModalPriorityPickerProps {
  onChange: (e: { target: { value: string } }) => void;
  top: string;
}

export default function ModalPriorityPicker({
  onChange,
  top,
}: ModalPriorityPickerProps) {
  const item: PriorityItem[] = [
    { type: "high", label: "Alta" },
    { type: "medium", label: "Media" },
    { type: "low", label: "Baja" },
  ];
  return (
    <div
      style={{ top }}
      className="absolute top-7 flex flex-col bg-background-primary drop-shadow-lg rounded-lg p-2 gap-1 z-50"
    >
      {item.map((item) => (
        <p
          key={item.label}
          className="p-2 cursor-pointer hover:bg-gray-100"
          onClick={() => onChange({ target: { value: item.type } })}
        >
          {item.label}
        </p>
      ))}
    </div>
  );
}
