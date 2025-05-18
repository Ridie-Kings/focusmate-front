export default function LoadingStatus({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center gap-3 p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
        <p className="text-primary-500 font-medium">Cargando {text}...</p>
      </div>
    </div>
  );
}
