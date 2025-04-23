import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Datos recibidos:", body);

    const { name, email, message, title } = body;

    if (!name || !email || !message || !title) {
      console.error("Faltan campos requeridos:", {
        name,
        email,
        message,
        title,
      });
      return NextResponse.json(
        {
          success: false,
          error: "Faltan campos requeridos",
          receivedData: { name, email, message, title },
        },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "Sherpapp Contacto <no-reply@thallein.com>",
      to: ["soporte@thallein.com"],
      subject: "Nuevo mensaje de contacto",
      html: `<strong>Nombre:</strong> ${name}<br/>
             <strong>Email:</strong> ${email}<br/>
             <strong>Titulo:</strong> ${title}<br/>
             <strong>Mensaje:</strong><br/>${message}`,
    });

    console.log("Email enviado con éxito:", data);

    return NextResponse.json({
      success: true,
      data,
      receivedData: { name, email, message, title },
    });
  } catch (error) {
    console.error("Error en send-contact:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al enviar el email",
        errorDetails:
          error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
