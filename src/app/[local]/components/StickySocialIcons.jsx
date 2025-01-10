import React from 'react';
import WhatsappIcon from '../icons/WhatsappIcon';
import FacebookIcon from '../icons/FacebookIcon';
import YoutubeIcon from '../icons/YoutubeIcon';
import LinkedinIcon from '../icons/LinkedinIcon';
import InstagramIcon from '../icons/Instagram';
import EmailIcon from '../icons/EmailIcon';


const StickySocialIcons = () => {
  return (
    <div className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-4 bg-transparent p-3 rounded-lg shadow-lg">
      <a
        href="https://wa.me/33784582309?text=Hello%20I%20would%20like%20to%20know%20more%20about%20your%20online%20courses"

        target="_blank"
        rel="noopener noreferrer"
        className="text-[#007ea7] hover:text-[#ffa45b] transition duration-300"
      >
        <WhatsappIcon />
      </a>
      <a
        href="https://www.facebook.com/share/18s3C5AGKS/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#007ea7] hover:text-[#ffa45b] transition duration-300"
      >
        <FacebookIcon />
      </a>
      {/*   <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#007ea7] hover:text-[#ffa45b] transition duration-300"
      >
        <YoutubeIcon />
      </a> */}
      <a
        href="https://www.instagram.com/westfrench_academy/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#007ea7] hover:text-[#ffa45b] transition duration-300"
      >
        <InstagramIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/marionrichardfrenchteacher/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#007ea7] hover:text-[#ffa45b] transition duration-300"
      >
        <LinkedinIcon />
      </a>
      <a
        href="mailto:marion.westfrench@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#007ea7] hover:text-[#ffa45b] transition duration-300"
      >
        <EmailIcon />
      </a>
    </div>
  );
};

export default StickySocialIcons;
