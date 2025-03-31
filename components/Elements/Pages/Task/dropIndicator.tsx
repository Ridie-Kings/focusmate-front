type DropIndicatorProps = {
  beforeId: string | null;
  status: string;
};

export const DropIndicator = ({ beforeId, status }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-status={status}
      className="my-1 h-1 w-full bg-gray-100 opacity-0"
    />
  );
};
