import { Bell, Search } from "lucide-react";

export default function TopBar() {
  return (
    <section className="flex place-content-between px-5 py-10 w-full">
      <div className="flex flex-col">
        <p className="text-lg">Bienvenido, Mateo!</p>
        <h1 className="text-5xl ">Dashboard</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex items-center">
          <input
            className="shadow-lg border border-gray-100 px-3 py-1 rounded-full w-96 transition-all focus:w-[400px] outline-none"
            name="search"
            type="search"
          />
          <Search className="size-5 absolute right-3 text-black" />
        </div>
        <Bell size={20} />
        <div className="rounded-full bg-gray-100 size-8"></div>
      </div>
    </section>
  );
}
