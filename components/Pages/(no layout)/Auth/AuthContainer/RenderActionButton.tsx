import Button from "@/components/Reusable/Button";

export default function RenderActionButton({ type }: { type: string }) {
  if (type === "login")
    return (
      <Button size="large" type="submit" button="primary">
        Iniciar Sesión
      </Button>
    );
  else
    return (
      <Button size="large" type="submit" button="primary">
        Registrarse
      </Button>
    );
}
