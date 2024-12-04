import React from 'react';

const ContactForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12">
      <div className="w-full max-w-xl p-8 rounded-3xl shadow-lg text-black">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#ffa45b]">Contactez-nous</h1>
        <form className="space-y-6">
          {/* Nom et Prénom */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#007ea7]">
              Nom et Prénom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              className="w-full mt-2 p-3  rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b]"
              required
              placeholder="Entrez votre nom et prénom"
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
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b]"
              required
              placeholder="Entrez votre email"
            />
          </div>

          {/* Telephone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#007ea7]">
              Téléphone (optionnel)
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b]"
              placeholder="Entrez votre numéro de téléphone"
            />
          </div>

          {/* Level of French */}
          <div>
            <label htmlFor="french-level" className="block text-sm font-medium text-[#007ea7]">
              Niveau de français (optionnel)
            </label>
            <select
              id="french-level"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b]"
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

          {/* Objet */}
          <div>
            <label htmlFor="objet" className="block text-sm font-medium text-[#007ea7]">
              Objet (optionnel)
            </label>
            <input
              type="text"
              id="objet"
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b]"
              placeholder="Entrez l'objet de votre message"
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
              className="w-full mt-2 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#ffa45b]"
              required
              placeholder="Écrivez votre message ici..."
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
    </div>
  );
};

export default ContactForm;
