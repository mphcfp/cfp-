'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowIcon } from '@/components/icons';

const services = [
  'Brand strategy & identity',
  'Creative campaign',
  'Content & motion',
  'Website & digital experience',
  'I’m not sure yet',
] as const;

export default function BriefForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const pendingDownloads = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const [status, setStatus] = useState('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);
  const [fallbackBrief, setFallbackBrief] = useState<string | null>(null);

  useEffect(() => {
    const downloads = pendingDownloads.current;
    return () => {
      downloads.forEach((timeout, url) => {
        clearTimeout(timeout);
        URL.revokeObjectURL(url);
      });
      downloads.clear();
    };
  }, []);

  useEffect(() => {
    if (fallbackBrief !== null) {
      outputRef.current?.focus();
      outputRef.current?.select();
    }
  }, [fallbackBrief]);

  function prepareBrief(): string | null {
    const form = formRef.current;
    if (!form) return null;

    const values = new FormData(form);
    const value = (field: string) => String(values.get(field) ?? '').trim();
    const name = value('name');
    const description = value('description');

    nameRef.current?.setCustomValidity(name ? '' : 'Please enter your name.');
    descriptionRef.current?.setCustomValidity(
      description.length >= 12
        ? ''
        : 'Please describe your project in at least 12 characters.',
    );
    if (!form.reportValidity()) return null;

    return [
      'AURA | Project brief',
      '────────────────────────',
      `Name: ${name}`,
      `Business: ${value('business') || 'Not specified'}`,
      `Service: ${value('service') || 'Not specified'}`,
      `Preferred timeline: ${value('timeline') || 'Not specified'}`,
      '',
      'About the project:',
      description,
      '',
      'This brief was created on your device and has not been sent to anyone.',
    ].join('\n');
  }

  function clearFeedback(event: FormEvent<HTMLFormElement>) {
    const field = event.target;
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
      field.setCustomValidity('');
    }
    setStatus('');
    setFallbackBrief(null);
  }

  function downloadBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const brief = prepareBrief();
    const link = downloadRef.current;
    if (brief === null || !link) return;

    const file = new Blob(['\uFEFF', brief], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(file);
    link.href = url;
    link.click();
    const timeout = setTimeout(() => {
      URL.revokeObjectURL(url);
      pendingDownloads.current.delete(url);
    }, 1500);
    pendingDownloads.current.set(url, timeout);
    setStatus(
      'Your project brief is ready to download. No message has been sent. Keep the file for your next conversation.',
    );
  }

  async function copyBrief() {
    const brief = prepareBrief();
    if (brief === null) return;
    setFallbackBrief(null);

    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(brief);
      setStatus('Project brief copied. You can now paste it wherever you need it.');
    } catch {
      setFallbackBrief(brief);
      setStatus('Your brief is ready. Copy it from the text box below.');
    }
  }

  return (
    <form
      ref={formRef}
      id="brief-form"
      className="brief-form reveal"
      onSubmit={downloadBrief}
      onChange={clearFeedback}
      noValidate
    >
      <div className="form-row">
        <label>
          Your name <span aria-hidden="true">*</span>
          <input
            ref={nameRef}
            name="name"
            autoComplete="name"
            placeholder="What should we call you?"
            required
            maxLength={80}
          />
        </label>
        <label>
          Business name
          <input
            name="business"
            autoComplete="organization"
            placeholder="Your brand or company"
            maxLength={120}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          What do you need?
          <select name="service" defaultValue={services[0]}>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>
        <label>
          Preferred timeline
          <input name="timeline" placeholder="For example, next month" maxLength={120} />
        </label>
      </div>
      <label>
        Tell us about your idea <span aria-hidden="true">*</span>
        <textarea
          ref={descriptionRef}
          name="description"
          placeholder="What do you have in mind, and what would you like to achieve?"
          rows={4}
          required
          minLength={12}
          maxLength={4000}
        />
      </label>
      <p className="form-note">
        This form prepares a project brief on your device. It does not send a message.
      </p>
      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={!hydrated}>
          Download project brief
          <span aria-hidden="true"><ArrowIcon direction="down" /></span>
        </button>
        <button id="copy-brief" className="copy-button" type="button" onClick={copyBrief} disabled={!hydrated}>
          Copy brief
        </button>
      </div>
      <p id="form-status" role="status" aria-live="polite">{status}</p>
      <textarea
        ref={outputRef}
        id="brief-output"
        aria-label="Your prepared project brief"
        value={fallbackBrief ?? ''}
        readOnly
        hidden={fallbackBrief === null}
      />
      <a ref={downloadRef} download="aura-project-brief.txt" hidden aria-hidden="true" />
      <noscript>
        <p>Enable JavaScript in your browser to download your project brief.</p>
      </noscript>
    </form>
  );
}
