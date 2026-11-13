"use client";

import { useActionState } from "react";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/contact/actions";

const initialState: ContactFormState = { ok: false, message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  return (
    <form className="form-stack" action={formAction} noValidate>
      <input
        className="hp-field"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        defaultValue=""
      />

      {state.message ? (
        <p
          role="status"
          className={state.ok ? "form-status form-status--ok" : "form-status form-status--error"}
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="form-field">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            disabled={pending}
          />
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={pending}
          />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          disabled={pending}
        />
      </div>
      <button
        type="submit"
        className="btn-primary btn-with-icon contact-form-submit"
        disabled={pending}
      >
        {pending ? "Sending…" : "Send message"}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M22 2 11 13" />
          <path d="M22 2 15 22 11 13 2 9 22 2z" />
        </svg>
      </button>
    </form>
  );
}
