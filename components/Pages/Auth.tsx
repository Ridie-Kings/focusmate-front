import { Key, PersonStanding } from "lucide-react";
import Carousel from "../Elements/Auth/Carousel";
import Form from "../Elements/Auth/Form";

export type itemsForm = {
  label: string;
  icon?: React.ReactNode;
  type: "text" | "password" | "email" | "date" | "tel";
  name: string;
};

const renderForm = (type: "Login" | "Register"): itemsForm[] => {
  if (type === "Login") {
    return [
      {
        label: "Ingrese su correo electronico o usuario",
        icon: <PersonStanding size={15} />,
        type: "email",
        name: "email",
      },
      {
        label: "Contraseña",
        icon: <Key size={15} />,
        type: "password",
        name: "password",
      },
    ];
  } else {
    return [
      {
        label: "Nombre",
        type: "text",
        name: "name",
      },
      {
        label: "Apellido",
        type: "text",
        name: "surname",
      },
      {
        label: "Nombre de Usuario",
        type: "text",
        name: "pseudo",
      },
      {
        label: "Correo Electronico",
        type: "email",
        name: "email",
      },
      {
        label: "Numero de Telefono",
        type: "tel",
        name: "number",
      },
      {
        label: "Contraseña",
        type: "password",
        name: "password",
      },
      {
        label: "Repite contraseña",
        type: "password",
        name: "redopassword",
      },
      {
        label: "Cumpleanos",
        type: "date",
        name: "birthday",
      },
    ];
  }
};

export default function Auth({ type }: { type: "Login" | "Register" }) {
  return (
    <div className="flex w-full h-screen px-12 py-6">
      <Carousel />
      {type === "Login" ? (
        <Form
          title="¡Bienvenido de Nuevo!"
          page={type}
          itemsForm={renderForm(type)}
        />
      ) : (
        <Form
          title="Registro de Usuario"
          page={type}
          itemsForm={renderForm(type)}
        />
      )}
    </div>
  );
}
