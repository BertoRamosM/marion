import React from 'react';
import FacebookIcon from '../icons/FacebookIcon';
import LinkedinIcon from '../icons/LinkedinIcon';
import Instagram from '../icons/Instagram';
import YoutubeIcon from '../icons/YoutubeIcon';
import WhatsappIcon from '../icons/WhatsappIcon';
import EmailIcon from '../icons/EmailIcon';


const Footer = () => {
  return (
    <footer className="bg-[#f9f9f9] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6 items-center">
        {/* Left Section */}
        <div className="text-center md:text-left">
        <h1 className="text-sm sm:text-base lg:text-4xl font-bold flex flex-col items-center text-center">
  <span className="text-[#007ea7]">WestFrench</span>
  <span
    className={`text-[#2c7a7b]`}
    style={{
      fontFamily: "var(--font-dancing-script)",
      marginTop: "-12px",
    }}
  >
    Academy
  </span>
</h1>
          <p className="text-gray-700 mt-2">
            Cours en mini-groupe à Rennes :
            <br />
            La Maison des associations, 6 cours des Alliés à Rennes
            <br />
            <br />
           
<span className=''>Domiciliation de l&apos;entreprise : 13 rue de Lassy, 35580 Guignen</span>
          </p>
        </div>

        {/* Middle Section */}
        <div className="text-center md:text-left">
          <p className="text-gray-700">
            <strong>Téléphone:</strong> 07 84 58 23 09
            <br />
            <strong>Email:</strong>{' '}
            <a
              href="mailto:westfrench.marion@gmail.com"
              className="text-[#007ea7] hover:text-[#ffa45b] underline transition duration-300"
            >
              westfrench.marion@gmail.com
            </a>
          </p>
        </div>

        {/* Right Section */}
        <div className="text-center md:text-right">
          <div className="flex justify-center md:justify-end gap-4 mt-2">
          <a
  href="https://wa.me/33784582309?text=Hello%20I%20would%20like%20to%20know%20more%20about%20your%20online%20courses"
  target="_blank"
              rel="noopener noreferrer"
              className="text-[#007ea7] hover:text-[#ffa45b] transition duration-300"
            >
              <WhatsappIcon />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007ea7] hover:text-[#ffa45b] transition duration-300"
            >
              <FacebookIcon />
            </a>
            {/* <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007ea7] hover:text-[#ffa45b] transition duration-300"
            >
              <YoutubeIcon />
            </a> */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007ea7] hover:text-[#ffa45b] transition duration-300"
            >
              <Instagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007ea7] hover:text-[#ffa45b] transition duration-300"
            >
              <LinkedinIcon />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007ea7] hover:text-[#ffa45b] transition duration-300"
            >
              <EmailIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 mt-6 pt-4 text-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()}  <h1 className="text-sm sm:text-base lg:text-4xl font-bold flex flex-col items-center text-center">
  <span className="text-[#007ea7]">WestFrench</span>
  <span
    className={`text-[#2c7a7b]`}
    style={{
      fontFamily: "var(--font-dancing-script)",
      marginTop: "-12px",
    }}
  >
    Academy
  </span>
</h1> Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
