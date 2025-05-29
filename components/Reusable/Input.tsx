import { statesType } from "@/interfaces/Reusable/Inputs/InputsType";
import { CircleHelp, Eye, EyeOff } from "lucide-react";
import { useState, ChangeEvent } from "react";

interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  state?: statesType;
  placeholder?: string;
  icon?: React.ReactElement;
  label?: string;
  supportMessage?: string;
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  className?: string;
}

export default function Input({
  type = "text",
  state = "",
  placeholder,
  name,
  icon,
  label,
  supportMessage,
  value,
  defaultValue,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  readOnly = false,
  autoComplete,
  maxLength,
  minLength,
  pattern,
  className = "",
}: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const containerClass = `flex flex-col justify-center flex-1 relative gap-1 text-[#959595] ${className}`;
  const labelClass = "flex items-center gap-1 text-black text-sm";

  const getBorderClass = () => {
    if (disabled) return "border-[#E5E5E5] bg-[#F5F5F5] cursor-not-allowed";
    switch (state) {
      case "error":
        return "border-[#C32826] focus:outline-[#C32826] focus:ring-2 focus:ring-red-200";
      case "success":
        return "border-[#56AB91] focus:outline-[#56AB91] focus:ring-2 focus:ring-green-200";
      default:
        return "border-[#959595] focus:outline-[#8882CC] focus:ring-2 focus:ring-primary-200";
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(e);
    if (required && !e.target.value) {
      e.target.setCustomValidity("Este campo es requerido");
    } else {
      e.target.setCustomValidity("");
    }
  };

  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={name} className={labelClass}>
          {icon}
          {label}
          {required && (
            <span className="text-[#C32826]" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <div className="relative w-full flex items-center">
        <input
          id={name}
          name={name}
          type={type === "password" && showPassword ? "text" : type}
          className={`w-full py-2 pr-2 pl-4 placeholder:text-[#959595] text-black border rounded transition-all duration-200 ${getBorderClass()}`}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={handleBlur}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? `${name}-error` : undefined}
        />
        {type === "password" && (
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
