"use server";

import {
  isContactMailConfigured,
  sendContactMail,
} from "@/lib/contact-mail";

export type ContactFormState = {
  ok: boolean;
  message: string;
};

const MAX_NAME = 120;
const MAX_MESSAGE = 5000;

export async function submitContactForm(
  _prev: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  if (formData.get("website")) {
    return {
      ok: true,
      message: "Message sent successfully. I'll get back to you within a few days.",
    };
  }

  if (!isContactMailConfigured()) {
    return {
      ok: false,
      message:
        "Contact form is not configured yet. Please email me directly from the links above.",
    };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || name.length > MAX_NAME) {
    return { ok: false, message: "Please enter a valid name." };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  if (!message || message.length > MAX_MESSAGE) {
    return {
      ok: false,
      message: "Please enter a message (up to 5,000 characters).",
    };
  }

  try {
    await sendContactMail({ name, email, message });
    return {
      ok: true,
      message: "Message sent successfully. I'll get back to you within a few days.",
    };
  } catch {
    return {
      ok: false,
      message:
        "Something went wrong while sending. Please try again or use email above.",
    };
  }
}
