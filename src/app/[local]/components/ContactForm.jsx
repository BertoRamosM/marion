'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '../../../i18n/routing';
import SectionHeading from './SectionHeading';
import EmailIcon from '../icons/EmailIcon';
import NavPending from './NavPending';

/*
 * Field styling, shared so the six inputs cannot drift apart.
 *
 * They were bg-transparent with only a soft shadow and no border, sitting on
 * the page gradient — so there was no visible edge telling you where to type.
 * A filled field with a teal border gives each one a clear boundary.
 *
 * Both colours are picked from measurements, not by eye:
 *   - Border #1f8a86 is 3.94:1 against the cream card. The brand mint #a3e4db
 *     managed only 1.35:1, well under the 3:1 WCAG asks of UI boundaries.
 *   - Fill #e7e5e4 is stone-200: a warm grey rather than a cool one, so it sits
 *     with the cream card instead of fighting it. Chosen over the lighter
 *     greys because at 1.19 it separates from the cream noticeably, where
 *     gray-50 was 1.01 — near-invisible against the card.
 *   - The gray-600 placeholder stays: on gray-500 this fill is 3.85:1, under
 *     the 4.5 threshold.
 */
const FIELD =
  'w-full mt-2 p-3 rounded-lg bg-field border-2 border-field-line text-ink-900 ' +
  'placeholder:text-ink-600 shadow-sm transition-colors duration-200 ' +
  'hover:border-brand focus:border-brand focus:outline-none ' +
  'focus:ring-2 focus:ring-ember';

/*
 * @param scope   Optional label appended to the heading, so the two offer
 *                pages say which course you are writing about. Passed in
 *                rather than derived here, because the caller already knows,
 *                and the home page passes nothing.
 * @param course  Which option the course dropdown starts on: "rennes",
 *                "online", or nothing for the home page, where the visitor
 *                has not signalled either yet.
 */
const ContactForm = ({ scope, course }) => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const t = useTranslations('Contact');
  const tLegal = useTranslations('Legal');
  const tHeader = useTranslations('Header');
  const tLabel = useTranslations('SectionLabel');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      setStatus('pending');
      setError(null);
      const form = event.target;
      const formData = new FormData(form);
      // Update the fetch URL to point to __forms.html in the public folder
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });
      if (res.ok) {
        setStatus('ok');
        form.reset(); // Clear the form inputs
      } else {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
    } catch (e) {
      setStatus('error');
      setError(e.message);
    }
  };
  

  // min-h-screen removed along with the tall top padding: with the wider card
  // the content no longer fills the viewport, so centring it inside a
  // full-height box would have re-added empty space above the form.
  return (
    <div className="flex items-start justify-center px-0 sm:px-6 pt-4 sm:pt-8 pb-12 sm:pb-24" id="contact">
      <div className="w-full max-w-3xl bg-cream p-8 rounded-3xl shadow-lg text-ink-max">
        <SectionHeading
          icon={<EmailIcon />}
          label={tLabel('contact')}
          title={
            <span className="text-rust-lg">
              {t('title')}
              {scope ? ` — ${scope}` : ''}
            </span>
          }
        />

        <form
          className="space-y-6"
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleFormSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
            </label>
          </p>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-brand">
              {t('text1')} <span className="text-danger-mark">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={FIELD}
              required
              placeholder={t('text2')}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brand">
              {t('text3')} <span className="text-danger-mark">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={FIELD}
              required
              placeholder={t('text4')}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-brand">
              {t('text5')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={FIELD}
              placeholder={t('text6')}
            />
          </div>

          {/*
            Which course the enquiry is about.

            This replaced a hidden field that recorded the page instead. A
            visible control is better than inferring it: someone reading the
            Rennes page may well want the online lessons, and now they can
            say so rather than being silently labelled by where they stood.

            The offer pages start it on their own course, so for most people
            it is already right and needs no thought. The home page starts it
            on "I do not know", which is the honest default there and is the
            same option the level field already offers.

            Values are stable keys rather than the visible labels, so all
            three languages land in one column in Netlify as "rennes" or
            "online" rather than six different strings.
          */}
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-brand">
              {t('course')}
            </label>
            <select
              id="course"
              name="course"
              defaultValue={course || ''}
              className={FIELD}
            >
              <option value="">{t('text8')}</option>
              <option value="rennes">{tHeader('coursesRennes')}</option>
              <option value="online">{tHeader('onlineCourses')}</option>
            </select>
          </div>

          {/* French Level */}
          <div>
            <label htmlFor="frenchLevel" className="block text-sm font-medium text-brand">
              {t('text7')}
            </label>
            <select
              id="frenchLevel"
              name="frenchLevel"
              className={FIELD}
            >
              <option value="">{t('text8')}</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="objet" className="block text-sm font-medium text-brand">
              {t('text15')}
            </label>
            <input
              type="text"
              id="objet"
              name="objet"
              className={FIELD}
              placeholder={t('text16')}
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-brand">
              {t('text17')} <span className="text-danger-mark">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className={FIELD}
              required
              placeholder={t('text18')}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
            aria-label='send message'
              type="submit"
              className="bg-gradient-to-tr from-ember to-ember-deep px-6 py-3 rounded-lg text-on-ember font-semibold shadow hover:scale-105 transition-transform duration-300 ease-out"
              disabled={status === 'pending' || status === 'ok'}
            >
              {status === 'ok'
                ? t('text20') // Message sent
                : status === 'pending'
                ? t('text21') // Sending...
                : t('text19')} {/* Send message */}
            </button>

            {/* GDPR asks that people be told how their data is used at the
                point of collection, not only on a separate page. */}
            <p className="mt-4 text-xs text-ink-600">
              {tLegal('formNotice')}{' '}
              <Link
                href="/mentions-legales"
                className="text-brand hover:text-rust underline"
              >
                {tLegal('formNoticeLink')}
                <NavPending />
              </Link>
            </p>
          </div>
        </form>

        {/*
          Status messages. role="alert" + aria-live so screen readers announce
          them, and sized to actually be noticed — the previous one-line red
          text was easy to miss right under a long form. The technical detail
          is kept but demoted, since "Error: 500" means nothing to a visitor.
        */}
        {status === 'error' && (
          <div
            role="alert"
            aria-live="assertive"
            className="mt-6 rounded-2xl border-2 border-danger-line bg-danger-bg p-5 text-center shadow-lg"
          >
            <p className="text-lg font-bold text-danger-text">
              {t('errorTitle')}
            </p>
            <p className="mt-2 text-sm text-danger-text-strong">{t('errorHelp')}</p>

            {/* The address as its own tappable block rather than an inline
                link: if the form is broken, this is the only way through, so
                it should be impossible to miss. */}
            <a
              href="mailto:marion.westfrench@gmail.com"
              className="mt-3 inline-block break-all rounded-lg bg-surface px-5 py-3 text-base font-bold text-danger-text underline decoration-2 underline-offset-2 shadow transition-transform duration-300 hover:scale-105"
            >
              marion.westfrench@gmail.com
            </a>
            {error && (
              <p className="mt-3 text-xs text-danger-detail">
                {t('errorMessage')}: {error}
              </p>
            )}
          </div>
        )}

        {status === 'ok' && (
          <div
            role="status"
            aria-live="polite"
            className="mt-6 rounded-2xl border-2 border-mint bg-mist p-5 text-center shadow-lg"
          >
            <p className="text-lg font-bold text-brand-deep">
              {t('successTitle')}
            </p>
            <p className="mt-2 text-sm text-brand">
              {t('successHelp')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
