const items = [
  { label: "Pendientes", number: 2 },
  { label: "En Progreso", number: 1 },
  { label: "Completados", number: 1 },
  { label: "No Completados", number: 0 },
];
export default function StatusCards({
  setFilter,
  filter,
}: {
  setFilter: (filter: string) => void;
  filter: string;
}) {
  return (
    <ul className="flex w-full place-content-between gap-3 p-3">
      {items.map((item) => (
        <li key={item.label} className="w-1/4">
          <div
            style={{
              backgroundColor: filter === item.label ? "#202020" : "",
              color: filter === item.label ? "#fff9f9" : "",
            }}
            className="flex flex-col border rounded-lg w-full h-16 p-2 cursor-pointer transition-all duration-300 ease-in-out"
            onClick={() => setFilter(filter === item.label ? "" : item.label)}
          >
            <span className="truncate">{item.label}</span>
            <span>{item.number}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
