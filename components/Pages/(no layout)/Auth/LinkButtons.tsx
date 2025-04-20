import { LinkIcon } from "lucide-react";

export default function LinkButtons() {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <div className="flex w-full items-center gap-2">
        <div className="flex-1 h-[1px] bg-black" />
        <p className="font-light">O puedes</p>
        <div className="flex-1 h-[1px] bg-black" />
      </div>
      <button
        type="button"
        className="flex-1 w-full active:bg-primary-500 hover:bg-primary-700 hover:text-white active:text-white border border-primary-500 px-2 py-4 rounded-2xl flex items-center justify-center gap-4 transition-colors duration-300 cursor-pointer"
      >
        <p>Iniciar Sesión con Google</p>
        <LinkIcon size={20} />
      </button>
    </div>
  );
}
