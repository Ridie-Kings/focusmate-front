import { AuthField } from "@/interfaces/Auth/AuthType";


export const InputField = ({
  name,
  type,
  label,
  icon,
  placeholder,
}: AuthField) => {
  return (
    <div className="flex items-center justify-center w-full relative gap-2">
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="border-b w-full outline-hidden border-black-100 peer py-0.5"
      />
      <label
        htmlFor=""
        className="text-gray-100 absolute -top-6 left-0 flex items-center gap-1 peer-focus:text-black text-sm"
      >
        {icon}
        {label}
      </label>
    </div>
  );
};
