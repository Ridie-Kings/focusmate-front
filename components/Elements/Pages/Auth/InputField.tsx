import { AuthField } from "@/interfaces/Auth/AuthType";

export const InputField = ({
  name,
  type,
  label,
  icon,
  placeholder,
}: AuthField) => {
  return (
    <div className="flex flex-col justify-center w-full relative gap-2 text-accent">
      <label
        htmlFor=""
        className="flex items-center gap-1 text-black font-light"
      >
        {icon}
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="border-b px-4 w-full outline-hidden border-accent peer py-2"
      />
    </div>
  );
};
