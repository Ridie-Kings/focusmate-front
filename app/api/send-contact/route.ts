import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Datos recibidos:", body)
  const { name, email, message } = body;

  try {
    const data = await resend.emails.send({
      from: "Sherpapp Contacto <no-reply@sherpapp.com>",
      to: ["soporte@thallein.com"],
      subject: "Nuevo mensaje de contacto",
      html: `<strong>Nombre:</strong> ${name}<br/>
             <strong>Email:</strong> ${email}<br/>
             <strong>Mensaje:</strong><br/>${message}`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error en send-contact:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
