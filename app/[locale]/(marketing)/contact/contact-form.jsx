"use client";

import { useState } from "react";

const initialForm = {
  email: "",
  fullName: "",
  message: "",
  subject: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field, value) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: "", type: "" });

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not send your message.");
      }

      setForm(initialForm);
      setStatus({
        message: "Message sent successfully. We will get back to you soon.",
        type: "success",
      });
    } catch (error) {
      setStatus({
        message: error.message || "Could not send your message.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-semibold text-foreground" htmlFor="fullName">
          Full Name
        </label>
        <input
          autoComplete="name"
          className="mt-2 w-full rounded-lg border border-border px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          id="fullName"
          name="fullName"
          onChange={(event) => updateField("fullName", event.target.value)}
          required
          type="text"
          value={form.fullName}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground" htmlFor="email">
          Email Address
        </label>
        <input
          autoComplete="email"
          className="mt-2 w-full rounded-lg border border-border px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          id="email"
          name="email"
          onChange={(event) => updateField("email", event.target.value)}
          required
          type="email"
          value={form.email}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground" htmlFor="subject">
          Subject
        </label>
        <input
          className="mt-2 w-full rounded-lg border border-border px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          id="subject"
          name="subject"
          onChange={(event) => updateField("subject", event.target.value)}
          required
          type="text"
          value={form.subject}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground" htmlFor="message">
          Message
        </label>
        <textarea
          className="mt-2 min-h-36 w-full resize-y rounded-lg border border-border px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          id="message"
          name="message"
          onChange={(event) => updateField("message", event.target.value)}
          required
          value={form.message}
        />
      </div>

      {status.message ? (
        <p
          className={`rounded-lg px-4 py-3 text-sm ${
            status.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
          role="status"
        >
          {status.message}
        </p>
      ) : null}

      <button
        className="inline-flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300 sm:w-auto"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
