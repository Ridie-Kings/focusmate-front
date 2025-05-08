export default function CategoriesList() {
  const categorias = [
    { label: "Completadas", color: "#248277" },
    { label: "No Completadas", color: "#c0abc1" },
    { label: "Creadas", color: "#7688bf" },
    { label: "Pendientes", color: "#aaa3ff" },
  ];

  return (
    <ul className="w-full grid grid-cols-4">
      {categorias.map((item) => (
        <li
          key={item.label}
          className="flex items-center justify-center gap-2 text-sm"
        >
          <div
            style={{ backgroundColor: item.color }}
            className="size-4 rounded-full"
          />
          <p>{item.label}</p>
        </li>
      ))}
    </ul>
  );
}
