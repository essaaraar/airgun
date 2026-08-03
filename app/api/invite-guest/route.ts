import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, specialty, missionName, objective } = await request.json();

  try {
    const data = await resend.emails.send({
      from: 'AIrGun OS <noreply@yourdomain.com>',
      to: [email],
      subject: `[AIrGun OS] You have been invited to join Mission: ${missionName}`,
      html: `
        <div style="background-color: #000; color: #fff; padding: 24px; font-family: sans-serif; border-radius: 12px;">
          <h2 style="color: #10b981;">Mission Room B Invitation</h2>
          <p>Hi ${name},</p>
          <p>You have been added as a <strong>Human Guest</strong> to active Mission Room B for project <strong>"${missionName}"</strong>.</p>
          <p><strong>Mission Objective:</strong> ${objective}</p>
          <p><strong>Assigned Purpose:</strong> ${specialty}</p>
          <p style="color: #888; font-size: 12px; margin-top: 24px;">AIrGun Autonomous Flight Recorder Enabled</p>
        </div>
      `,
    });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}