"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { Reveal, RevealItem } from "./Reveal";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export default function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      // honeypot
      company: String(fd.get("company") ?? ""),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus({ kind: "error", message: "Please fill in all fields." });
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error ?? `Request failed (${res.status})`);
      }
      setStatus({ kind: "success" });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  const submitting = status.kind === "submitting";

  return (
    <section id="contact" className="ch-gold tint-gold relative isolate px-4 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-3xl" amount={0.2}>
        <RevealItem as="div" className="flex items-baseline justify-center gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
          <span className="h-px w-12 bg-line/60" />
          <span className="text-ch">Chapter V &middot; Golden hour</span>
          <span>Write back</span>
          <span className="h-px w-12 bg-line/60" />
        </RevealItem>
        <RevealItem
          as="h2"
          className="mt-6 text-balance text-center font-display text-[clamp(2.25rem,5vw,3.75rem)] font-normal leading-[1.04] tracking-[-0.012em]"
        >
          If any of this <span className="text-ch italic">resonated</span>,
          <br />
          I&rsquo;d love to hear from you.
        </RevealItem>
        <RevealItem as="p" className="mt-5 text-center font-body text-[17px] leading-[1.7] text-ink/75">
          A project, an idea, an oddly specific question about CSS &mdash; the
          door&rsquo;s open. I read everything; I reply to most things.
        </RevealItem>

        <RevealItem className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            href="mailto:vaishnavidubey1290@gmail.com"
            variant="primary"
          >
            Email Me
          </MagneticButton>
          <MagneticButton
            href="https://www.linkedin.com/in/vaishnavi-dubey/"
            variant="secondary"
            external
          >
            LinkedIn
          </MagneticButton>
          <MagneticButton
            href="https://github.com/Vaishnavi-Dubey"
            variant="secondary"
            external
          >
            GitHub
          </MagneticButton>
        </RevealItem>

        <RevealItem className="mt-12">
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-line/40 bg-surface/50 p-6 backdrop-blur-sm sm:p-8"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" type="text" required />
              <Field
                label="Email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
              />
            </div>
            <Field
              className="mt-5"
              label="Message"
              name="message"
              as="textarea"
              required
              rows={5}
              placeholder="What's on your mind?"
            />

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <AnimatePresence mode="wait" initial={false}>
                {status.kind === "success" && (
                  <motion.p
                    key="ok"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-sm text-accent-glow"
                  >
                    ✓ Sent — I&apos;ll get back to you soon.
                  </motion.p>
                )}
                {status.kind === "error" && (
                  <motion.p
                    key="err"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-sm text-red-400"
                  >
                    ✗ {status.message}
                  </motion.p>
                )}
                {status.kind !== "success" && status.kind !== "error" && (
                  <span key="idle" className="text-xs text-muted">
                    Powered by Resend · usually replies within a day or two.
                  </span>
                )}
              </AnimatePresence>

              <MagneticButton
                type="submit"
                variant="primary"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send message"}
              </MagneticButton>
            </div>
          </form>
        </RevealItem>
      </Reveal>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  rows,
  as = "input",
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  as?: "input" | "textarea";
  className?: string;
}) {
  const cls =
    "w-full rounded-md border border-line/60 bg-base/40 px-3 py-2.5 text-sm text-ink placeholder-muted/70 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30";
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={rows}
          className={`${cls} resize-y`}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}
