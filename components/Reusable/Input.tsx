import { statesType } from "@/interfaces/Reusable/Inputs/InputsType";
import { CircleHelp, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type FieldType = 1 | 2 | 3;

interface InputProps {
  field: FieldType;
  state: statesType;
  placeholder: string;
  icon?: React.ReactElement;
  label: string;
  supportMessage?: string;
}

export default function Input({
  field,
  state,
  placeholder,
  icon,
  label,
  supportMessage,
}: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const containerClass =
    "flex flex-col justify-center w-full relative gap-1 text-[#959595]";
  const labelClass = "flex items-center gap-1 text-black text-sm";

  return (
    <div className={containerClass}>
      <label className={labelClass}>
        {icon}
        {label}
      </label>
      <div className="relative w-full flex items-center">
        <input
          type={field === 3 && !showPassword ? "password" : "text"}
          className="w-full py-2 pr-2 pl-4 placeholder:text-[#959595] text-black border border-[#959595] rounded focus:outline-[#8882CC]"
          placeholder={placeholder}
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
          className={`flex items-center gap-2 ${
            state === "error" ? "text-[#C32826]" : "text-[#56AB91]"
          }`}
        >
          <CircleHelp size={16} />
          {supportMessage}
        </p>
      )}
    </div>
  );
}
