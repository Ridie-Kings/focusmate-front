import { InputFieldProps } from "@/services/interfaces/Auth/AuthType";

export const InputField = ({ name, type, label, icon, onChange }: InputFieldProps) => {
	return (
    <div className="flex items-center justify-center w-full">
      <div className="relative w-full">
        <input
          id={name}
          name={name}
          type={type}
          onChange={onChange}
          placeholder=""
          className="border-b"
        />
        <label htmlFor="" className="text-gray-100 absolute -top-6 left-0">
          {icon}
          {label}
        </label>
      </div>
    </div>
  );
};