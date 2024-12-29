import React from 'react';
import WhatsappIcon from '../icons/WhatsappIcon';
import FacebookIcon from '../icons/FacebookIcon';
import YoutubeIcon from '../icons/YoutubeIcon';
import LinkedinIcon from '../icons/LinkedinIcon';
import InstagramIcon from '../icons/Instagram';

const StickySocialIcons = () => {
  return (
    <div className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-4 bg-white p-3 rounded-lg shadow-lg">
      <a
        href="https://google.es"
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
      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#007ea7] hover:text-[#ffa45b] transition duration-300"
      >
        <YoutubeIcon />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#007ea7] hover:text-[#ffa45b] transition duration-300"
      >
        <InstagramIcon />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#007ea7] hover:text-[#ffa45b] transition duration-300"
      >
        <LinkedinIcon />
      </a>
    </div>
  );
};

export default StickySocialIcons;
