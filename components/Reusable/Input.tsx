import { statesType } from "@/interfaces/Reusable/Inputs/InputsType";
import { CircleHelp, Eye, EyeOff } from "lucide-react";
import { useState, ChangeEvent } from "react";

type FieldType = 1 | 2 | 3;

interface InputProps {
  field: FieldType;
  state?: statesType;
  placeholder: string;
  icon?: React.ReactElement;
  label: string;
  supportMessage?: string;
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
}

export default function Input({
  field,
  state = "",
  placeholder,
  name,
  icon,
  label,
  supportMessage,
  value,
  onChange,
  required = false,
  autoComplete,
}: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const containerClass =
    "flex flex-col justify-center w-full relative gap-1 text-[#959595]";
  const labelClass = "flex items-center gap-1 text-black text-sm";

  // Décider la classe de bordure en fonction de l'état
  const getBorderClass = () => {
    switch (state) {
      case "error":
        return "border-[#C32826] focus:outline-[#C32826]";
      case "success":
        return "border-[#56AB91] focus:outline-[#56AB91]";
      default:
        return "border-[#959595] focus:outline-[#8882CC]";
    }
  };

  return (
    <div className={containerClass}>
      <label htmlFor={name} className={labelClass}>
        {icon}
        {label}
        {required && <span className="text-[#C32826]">*</span>}
      </label>
      <div className="relative w-full flex items-center">
        <input
          id={name}
          name={name}
          type={field === 3 && !showPassword ? "password" : "text"}
          className={`w-full py-2 pr-2 pl-4 placeholder:text-[#959595] text-black border rounded ${getBorderClass()}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
        />
        {field === 3 && (
          <div
            className="absolute right-3 text-black cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        )}
      </div>
      {supportMessage && (
        <p
          className={`flex items-center gap-2 text-sm ${
            state === "error"
              ? "text-[#C32826]"
              : state === "success"
              ? "text-[#56AB91]"
              : "text-[#959595]"
          }`}
        >
          <CircleHelp size={16} />
          {supportMessage}
        </p>
      )}
    </div>
  );
}
