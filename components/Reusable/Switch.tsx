export default function Switch({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="w-14 h-8 rounded-full transition-all duration-300 cursor-pointer relative bg-secondary-100"
    >
      <div
        className={`absolute flex items-center justify-center top-0.5 size-7 rounded-full  transition-all duration-300 ${
          value ? "left-6.5 bg-primary-500" : "left-1 bg-white"
        }`}
      >
        <span
          className={`top-1 size-2 rounded-full bg-black transition-all duration-300 ${
            value ? "bg-white" : "bg-primary-500"
          }`}
        />
      </div>
    </button>
  );
}
