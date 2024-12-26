const items = [
  { label: "Pendientes", number: 16 },
  { label: "En Progreso", number: 8 },
  { label: "Completados", number: 2 },
  { label: "No Completados", number: 1 },
];
export default function StatusCards() {
  return (
    <ul className="flex w-full place-content-between p-3">
      {items.map((item) => (
        <li key={item.label}>
          <div className="flex flex-col rounded-lg w-40 h-16 p-2 bg-black-100 text-gray-100 cursor-pointer">
            <span>{item.label}</span>
            <span>{item.number}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
