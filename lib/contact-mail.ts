import nodemailer from "nodemailer";
import { site } from "@/config/site";

export type ContactMailPayload = {
  name: string;
  email: string;
  message: string;
};

function smtpConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s/g, "");
  if (!user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? "587");
  const secure =
    process.env.SMTP_SECURE === "true" ||
    process.env.SMTP_SECURE === "1" ||
    port === 465;

  return {
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port,
    secure,
    auth: { user, pass },
  };
}

export function isContactMailConfigured(): boolean {
  return smtpConfig() !== null;
}

export async function sendContactMail(payload: ContactMailPayload): Promise<void> {
  const config = smtpConfig();
  if (!config) {
    throw new Error("SMTP is not configured");
  }

  const to = process.env.CONTACT_TO?.trim() || site.email;
  const from = process.env.SMTP_FROM?.trim() || config.auth.user;

  const transporter = nodemailer.createTransport(config);

  const text = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    "",
    payload.message,
  ].join("\n");

  const html = `
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></p>
    <hr />
    <pre style="font-family: inherit; white-space: pre-wrap;">${escapeHtml(payload.message)}</pre>
  `.trim();

  await transporter.sendMail({
    from: `"${site.name} Portfolio" <${from}>`,
    to,
    replyTo: `"${payload.name}" <${payload.email}>`,
    subject: `Portfolio contact from ${payload.name}`,
    text,
    html,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
