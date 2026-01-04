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
          className="space-y-6"
          name="contact"
          method="POST"
          action="/success"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          {/* Netlify required hidden fields */}
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#007ea7]"
            >
              {t('text1')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder={t('text2')}
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#007ea7]"
            >
              {t('text3')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder={t('text4')}
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#007ea7]"
            >
              {t('text5')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder={t('text6')}
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
            />
          </div>

          {/* French Level */}
          <div>
            <label
              htmlFor="frenchLevel"
              className="block text-sm font-medium text-[#007ea7]"
            >
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
            <label
              htmlFor="objet"
              className="block text-sm font-medium text-[#007ea7]"
            >
              {t('text15')}
            </label>
            <input
              type="text"
              id="objet"
              name="objet"
              placeholder={t('text16')}
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[#007ea7]"
            >
              {t('text17')} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              placeholder={t('text18')}
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              aria-label="send message"
              className="bg-gradient-to-tr from-[#ffa45b] to-[#ff7c5b] px-6 py-3 rounded-lg text-white font-semibold shadow hover:scale-105 transition-transform duration-300 ease-out"
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
