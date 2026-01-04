'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const ContactForm = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const t = useTranslations('Contact');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      setStatus('pending');
      setError(null);
      const form = event.target;
      const formData = new FormData(form);
      // Update the fetch URL to point to __forms.html in the public folder
   const res = await fetch('/', {
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
  

  return (
    <div className="flex items-center justify-center min-h-screen px-0 sm:px-6 py-12" id="contact">
      <div className="w-full max-w-xl p-8 rounded-3xl shadow-lg text-black">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#ffa45b]">{t('title')}</h1>

        <form
  className="space-y-6"
  name="contact"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  onSubmit={handleFormSubmit}
>
  <input type="hidden" name="form-name" value="contact" />
  <input type="hidden" name="bot-field" />

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#007ea7]">
              {t('text1')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
              required
              placeholder={t('text2')}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#007ea7]">
              {t('text3')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
              required
              placeholder={t('text4')}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#007ea7]">
              {t('text5')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
              placeholder={t('text6')}
            />
          </div>

          {/* French Level */}
          <div>
            <label htmlFor="frenchLevel" className="block text-sm font-medium text-[#007ea7]">
              {t('text7')}
            </label>
            <select
              id="frenchLevel"
              name="frenchLevel"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
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
            <label htmlFor="objet" className="block text-sm font-medium text-[#007ea7]">
              {t('text15')}
            </label>
            <input
              type="text"
              id="objet"
              name="objet"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
              placeholder={t('text16')}
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#007ea7]">
              {t('text17')} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
              required
              placeholder={t('text18')}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
            aria-label='send message'
              type="submit"
              className="bg-gradient-to-tr from-[#ffa45b] to-[#ff7c5b] px-6 py-3 rounded-lg text-white font-semibold shadow hover:scale-105 transition-transform duration-300 ease-out"
              disabled={status === 'pending' || status === 'ok'}
            >
              {status === 'ok'
                ? t('text20') // Message sent
                : status === 'pending'
                ? t('text21') // Sending...
                : t('text19')} {/* Send message */}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {status === 'error' && <div className="mt-4 text-red-500">{t('errorMessage')}: {error}</div>}
      </div>
    </div>
  );
};

export default ContactForm;
