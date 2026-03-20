import { type NextRequest, NextResponse } from "next/server";

// TODO: Wire up Resend for email delivery
// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
	const body = await request.json();

	// TODO: Send email via Resend
	// await resend.emails.send({
	//   from: "contact@yourdomain.com",
	//   to: "hi@pawelniedzwiecki.com",
	//   subject: `New inquiry: ${body.serviceType}`,
	//   html: `...`,
	// });

	console.log("[contact] New inquiry received:", {
		name: body.name,
		email: body.email,
		message: body.message,
	});

	return NextResponse.json({ ok: true });
}
