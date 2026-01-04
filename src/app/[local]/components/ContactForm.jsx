'use client';

import { useTranslations } from 'next-intl';

const ContactForm = () => {
  const t = useTranslations('Contact');

  return (
    <div
      className="flex items-center justify-center min-h-screen px-0 sm:px-6 py-12"
      id="contact"
    >
      <div className="w-full max-w-xl p-8 rounded-3xl shadow-lg text-black">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#ffa45b]">
          {t('title')}
        </h1>

        <form
          name="contact"
          method="POST"
          action="/success"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          className="space-y-6"
        >
          {/* REQUIRED by Netlify */}
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#007ea7]">
              {t('text1')} *
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder={t('text2')}
              className="w-full mt-2 p-3 rounded-lg shadow bg-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#007ea7]">
              {t('text3')} *
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder={t('text4')}
              className="w-full mt-2 p-3 rounded-lg shadow bg-transparent"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-[#007ea7]">
              {t('text5')}
            </label>
            <input
              type="tel"
              name="phone"
              placeholder={t('text6')}
              className="w-full mt-2 p-3 rounded-lg shadow bg-transparent"
            />
          </div>

          {/* French Level */}
          <div>
            <label className="block text-sm font-medium text-[#007ea7]">
              {t('text7')}
            </label>
            <select
              name="frenchLevel"
              className="w-full mt-2 p-3 rounded-lg shadow bg-transparent"
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
            <label className="block text-sm font-medium text-[#007ea7]">
              {t('text15')}
            </label>
            <input
              type="text"
              name="objet"
              placeholder={t('text16')}
              className="w-full mt-2 p-3 rounded-lg shadow bg-transparent"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-[#007ea7]">
              {t('text17')} *
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder={t('text18')}
              className="w-full mt-2 p-3 rounded-lg shadow bg-transparent"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-tr from-[#ffa45b] to-[#ff7c5b] px-6 py-3 rounded-lg text-white font-semibold"
            >
              {t('text19')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
