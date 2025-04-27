import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { _id, email } = body;

  try {
    await resend.emails.send({
      from: "Sherpapp intrest <no-reply@thallein.com>",
      to: ["soporte@thallein.com"],
      subject: "Nuevo mensaje de prev-interesado prime",
      html: `<strong>_id:</strong> ${_id}<br/>
             <strong>Email:</strong> ${email}<br/>`,
    });

    return NextResponse.json({ success: true, data: "Mensaje enviado" });
  } catch (error) {
    console.error("Error en send-intrest:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
