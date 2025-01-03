'use client';
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

  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [modalMessage, setModalMessage] = useState(''); // Modal message state
  const [status, setStatus] = useState({ loading: false, error: false, success: false }); // Status of the submission

  // Handle form data change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: false, success: false });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus({ loading: false, success: true, error: false });
        setModalMessage('Votre message a été envoyé avec succès!');
        setModalVisible(true);
      } else {
        throw new Error('Failed to send the email');
      }
    } catch (error) {
      setStatus({ loading: false, success: false, error: true });
      setModalMessage('Une erreur est survenue. Veuillez réessayer.');
      setModalVisible(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12" id="contact">
      <div className="w-full max-w-xl p-8 rounded-3xl shadow-lg text-black ">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#ffa45b]">Contactez-moi</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name and Surname */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#007ea7]">
              Nom et Prénom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
              required
              placeholder="Entrez votre nom et prénom"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#007ea7]">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
              required
              placeholder="Entrez votre email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#007ea7]">
              Téléphone (optionnel)
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
              placeholder="Entrez votre numéro de téléphone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* French Level */}
          <div>
            <label htmlFor="frenchLevel" className="block text-sm font-medium text-[#007ea7]">
              Niveau de français (optionnel)
            </label>
            <select
              id="frenchLevel"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
              value={formData.frenchLevel}
              onChange={handleChange}
            >
              <option value="">Je ne sais pas</option>
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
              Objet (optionnel)
            </label>
            <input
              type="text"
              id="objet"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
              placeholder="Entrez l'objet de votre message"
              value={formData.objet}
              onChange={handleChange}
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#007ea7]">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows="5"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b] bg-transparent"
              required
              placeholder="Écrivez votre message ici..."
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
              Envoyer
            </button>
          </div>
        </form>
      </div>

      {/* Modal for Success/Error */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-[#007ea7] mb-4">{modalMessage}</h2>
            <button
              className="mt-4 bg-gradient-to-tr from-[#ffa45b] to-[#ff7c5b] px-4 py-2 rounded-lg text-white font-semibold shadow hover:scale-105 transition-transform duration-300 ease-out"
              onClick={closeModal}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
