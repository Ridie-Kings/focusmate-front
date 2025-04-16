import { Camera, LaptopMinimal, PersonStanding } from "lucide-react";

export default function AcademicUser() {
  return (
    <>
      <p className="text-center text-4xl font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 z-50">
        Proximamente
      </p>
      <div className="w-full flex gap-6 blur">
        <div className="flex gap-4 w-full px-4">
          <PersonStanding />
          <div className="flex flex-col">
            <p>Nivel educativo alcanzado</p>
            <p className="text-sm text-gray-400">Terciario Completado</p>
          </div>
        </div>
        <div className="flex w-full gap-4 px-4">
          <PersonStanding />
          <div className="flex flex-col">
            <p>Institucíon</p>
            <p className="text-sm text-gray-400">
              UTN (Universidad Tecnologica Nacional)
            </p>
          </div>
        </div>
      </div>
      <p className="w-full border-b border-primary-200 py-4 px-6 blur">
        Progreso
      </p>
      <div className="blur">
        <p className="text-gray-400 text-sm">Carrera Universitaria</p>
        <div className="p-2 flex gap-4">
          <LaptopMinimal
            size={64}
            className="bg-secondary-100 p-3 rounded-full"
          />
          <div className="w-full flex flex-col place-content-between">
            <p className="text-2xl">Primer Semestre</p>
            <div className="flex place-content-between w-full text-sm">
              <p>Text Label</p>
              <p className="text-secondary-500">50%</p>
            </div>
            <div className="relative bg-secondary-200 w-full h-2 rounded-full">
              <div
                style={{ width: "50%" }}
                className="absolute bg-secondary-600 h-2 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="blur">
        <p className="text-gray-400 text-sm">Carrera Universitaria</p>
        <div className="p-2 flex gap-4">
          <Camera size={64} className="bg-secondary-100 p-3 rounded-full" />
          <div className="w-full flex flex-col place-content-between">
            <p className="text-2xl">Text Field</p>
            <div className="flex place-content-between w-full text-sm">
              <p>Text Label</p>
              <p className="text-secondary-500">75%</p>
            </div>
            <div className="relative bg-secondary-200 w-full h-2 rounded-full">
              <div
                style={{ width: "75%" }}
                className="absolute bg-secondary-600 h-2 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
