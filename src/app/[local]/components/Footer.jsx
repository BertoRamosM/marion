import React from 'react';
import FacebookIcon from '../icons/FacebookIcon';
import LinkedinIcon from '../icons/LinkedinIcon';
import Instagram from '../icons/Instagram';
import YoutubeIcon from '../icons/YoutubeIcon';
import WhatsappIcon from '../icons/WhatsappIcon';
import EmailIcon from '../icons/EmailIcon';
import Image from 'next/image';



const Footer = () => {
  return (
    <footer className="bg-[#f9f9f9] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6 items-center">
        {/* Left Section */}
        <div className="text-center md:text-left flex flex-col items-center sm:items-start">
          <div className="flex flex-col items-center text-center pb-4">
            <Image src="/logos/logo-no-bg.png" alt="WestFrench logo" width={150} height={150} />
          </div>
          <p className="text-gray-700 mt-2">
            Cours en mini-groupe à Rennes :
            <br />
            La Maison des associations, 6 cours des Alliés à Rennes
            <br />
            <br />

            <span className=''>Portée par la coopérative d’activités Elan Créateur, 7 rue Armand Herpin Lacroix – CS 73902, 35039 RENNES CEDEX</span>
          </p>
        </div>

        {/* Middle Section */}
        <div className="text-center md:text-left flex items-center justify-center flex-col gap-8">
          <p className="text-gray-700">
            <strong>Téléphone:</strong> 07 84 58 23 09
            <br />
            <strong>Email:</strong>{' '}
            <a
            aria-label='Email'
              href="mailto:marion.westfrench@gmail.com"
              className="text-[#006a8f] hover:text-[#ffa45b] underline transition duration-300"
            >
              marion.westfrench@gmail.com
            </a>
          </p>


            <div className="text-center md:text-right">
          <div className="flex justify-center md:justify-end gap-4 mt-2">
            <a
            aria-label='Whatsapp'
              href="https://wa.me/33784582309?text=Hello%20I%20would%20like%20to%20know%20more%20about%20your%20online%20courses"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#006a8f] hover:text-[#ffa45b] transition duration-300"
            >
              <WhatsappIcon />
            </a>
            <a
            aria-label='Facebook'
              href="https://www.facebook.com/share/18s3C5AGKS/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#006a8f] hover:text-[#ffa45b] transition duration-300"
            >
              <FacebookIcon />
            </a>
            {/* <a
            aria-label='Youtube'
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#006a8f] hover:text-[#ffa45b] transition duration-300"
            >
              <YoutubeIcon />
            </a> */}
            <a
            aria-label='Instagram'
              href="https://www.instagram.com/westfrench_academy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#006a8f] hover:text-[#ffa45b] transition duration-300"
            >
              <Instagram />
            </a>
            <a
            aria-label='LinkedIn'
              href="https://www.linkedin.com/in/marionrichardfrenchteacher/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#006a8f] hover:text-[#ffa45b] transition duration-300"
            >
              <LinkedinIcon />
            </a>
            <a
            aria-label='Email'
              href="mailto:marion.westfrench@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#006a8f] hover:text-[#ffa45b] transition duration-300"
            >
              <EmailIcon />
            </a>
          </div>
        </div>
        </div>

        {/* Right Section */}
      
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 mt-6 pt-4 text-center flex justify-center items-center">
        <p className="text-sm text-gray-600"></p>
          © {new Date().getFullYear()}  Tous droits réservés.<span className="inline-flex flex-col items-center text-center">
            <Image src="/logos/logo-no-bg.png" alt="WestFrench logo" width={200} height={200} className='pt-4' />
          </span>
        
      </div>
    </footer>
  );
};

export default Footer;
