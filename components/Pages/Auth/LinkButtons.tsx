import { LinkIcon } from "lucide-react";

export default function LinkButtons() {
  return (
    <div className="flex flex-col items-center w-full gap-2">
      <div className="flex w-full items-center gap-2">
        <div className="flex-1 h-[1px] bg-black" />
        <p className="font-light">O puedes</p>
        <div className="flex-1 h-[1px] bg-black" />
      </div>
      <div className="flex w-full gap-2">
        <button
          type="button"
          className="flex-1 hover:bg-black hover:text-white border border-black px-4 py-2 rounded-lg flex items-center justify-center font-light gap-2 transition-colors duration-300 ease-in-out cursor-pointer"
        >
          <LinkIcon size={20} />
          <p>Iniciar Sesión con Google</p>
        </button>
        <button
          type="button"
          className="flex-1 hover:bg-black hover:text-white border border-black px-4 py-2 rounded-lg flex items-center justify-center font-light gap-2 transition-colors duration-300 ease-in-out cursor-pointer"
        >
          <LinkIcon size={20} />
          <p>Iniciar Sesión con Facebook</p>
        </button>
      </div>
    </div>
  );
}
