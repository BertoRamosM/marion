'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    frenchLevel: '',
    objet: '',
    message: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false, success: false });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: false, success: false });

    const form = e.target;

    // Submit the form using fetch API
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
    });

    if (response.ok) {
      setStatus({ loading: false, success: true, error: false });
      setModalMessage("Thank you for your message! We'll get back to you shortly.");
    } else {
      setStatus({ loading: false, success: false, error: true });
      setModalMessage("Oops! Something went wrong. Please try again later.");
    }

    // Show the modal
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const t = useTranslations("Contact");

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12" id="contact">
      <div className="w-full max-w-xl p-8 rounded-3xl shadow-lg text-black">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#ffa45b]">{t("title")}</h1>
        <form
          className="space-y-6"
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          action="/"  // Add action to trigger the Netlify form submission
          onSubmit={handleSubmit}  // Corrected this line
        >
          <input type="hidden" name="form-name" value="contact" />
          <input name="bot-field" style={{ display: 'none' }} />

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#007ea7]">
              {t("text1")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
              required
              placeholder={t("text2")}
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#007ea7]">
              {t("text3")} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
              required
              placeholder={t("text4")}
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#007ea7]">
              {t("text5")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
              placeholder={t("text6")}
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* French Level */}
          <div>
            <label htmlFor="frenchLevel" className="block text-sm font-medium text-[#007ea7]">
              {t("text7")}
            </label>
            <select
              id="frenchLevel"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
              value={formData.frenchLevel}
              onChange={handleChange}
            >
              <option value="">{t("text8")}</option>
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
              {t("text15")}
            </label>
            <input
              type="text"
              id="objet"
              name="objet"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
              placeholder={t("text16")}
              value={formData.objet}
              onChange={handleChange}
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#007ea7]">
              {t("text17")} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows="5"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
              required
              placeholder={t("text18")}
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-tr from-[#ffa45b] to-[#ff7c5b] px-6 py-3 rounded-lg text-white font-semibold shadow hover:scale-105 transition-transform duration-300 ease-out"
            >
              {t("text19")}
            </button>
          </div>
        </form>

        {/* Modal for Success/Error */}
        {modalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-[#007ea7] mb-4">{modalMessage}</h2>
              <button
                className="mt-4 bg-gradient-to-tr from-[#ffa45b] to-[#ff7c5b] px-4 py-2 rounded-lg text-white font-semibold shadow hover:scale-105 transition-transform duration-300 ease-out"
                onClick={closeModal}
              >
                {t("text22")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
