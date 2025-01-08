import React from 'react';
import Image from 'next/image';

const Gallery = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 min-h-screen" id="gallery">
    

      {/* Gallery Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Image 1 */}
        <div className="bg-[#e5f8f6] text-[#007ea7] p-4 rounded-3xl shadow-lg relative overflow-hidden transition-transform duration-300 ease-in-out group">
          <div className="bg-gradient-to-r from-[#ffa45b] to-[#a3e4db] p-2 rounded-3xl shadow-lg">
            <Image
             src="/gallery/Photo 4.jpg"
              alt="Image 1"
              width={300}
              height={300}
              className="rounded-2xl transform hover:scale-105 transition-transform duration-300 ease-out"
            />
          </div>
        </div>

        {/* Image 2 */}
        <div className="bg-[#e5f8f6] text-[#007ea7] p-4 rounded-3xl shadow-lg relative overflow-hidden transition-transform duration-300 ease-in-out group">
        <div className="bg-gradient-to-r from-[#ffa45b] to-[#a3e4db] p-2 rounded-3xl shadow-lg">
            <Image
              src="/gallery/Photo 5.jpg"
              alt="Image 2"
              width={300}
              height={200}
              className="rounded-2xl transform hover:scale-105 transition-transform duration-300 ease-out"
            />
          </div>
          
        </div>

        {/* Image 3 */}
        <div className="bg-[#e5f8f6] text-[#007ea7] p-4 rounded-3xl shadow-lg relative overflow-hidden transition-transform duration-300 ease-in-out group">
          <div className="bg-gradient-to-r from-[#ffa45b] to-[#a3e4db] p-2 rounded-3xl shadow-lg">
            <Image
              src="/gallery/Photo 6.jpg"
              alt="Image 3"
              width={300}
              height={200}
              className="rounded-2xl transform hover:scale-105 transition-transform duration-300 ease-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
