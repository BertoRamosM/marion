'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/gallery/Photo 1.webp","/gallery/Photo 2.webp","/gallery/Photo 3.webp",
  "/gallery/Photo 10.webp","/gallery/Photo 11.webp","/gallery/rennes.webp",
  "/gallery/Photo 15.webp","/gallery/Photo 16.webp","/gallery/Photo 17.webp",
  "/gallery/Photo 18.webp","/gallery/Photo 19.webp","/gallery/Photo 20.webp",
  "/gallery/Photo 21.webp",
   "/gallery/Photo 4.webp","/gallery/Photo 5.webp","/gallery/Photo 6.webp",
   "/gallery/Photo 7.webp","/gallery/Photo 8.webp","/gallery/Photo 9.webp",
];

const Gallery = () => {
  const [visibleImages, setVisibleImages] = useState([]);

  useEffect(() => {
    images.forEach((img, index) => {
      setTimeout(() => {
        setVisibleImages(prev => [...prev, img]);
      }, index * 150); // staggered fade-in
    });
  }, []);

  return (
    <div className="columns-2 sm:columns-3 md:columns-4 gap-4 pt-8 space-y-4 w-2/3">
      {visibleImages.map((src, index) => (
        <div key={index} className="break-inside-avoid mb-4">
          <Image
            src={src}
            alt={`Photo ${index + 1}`}
            width={300}
            height={300}
            className="w-full h-auto rounded-lg transition-opacity duration-500 opacity-100"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={index < 3} // first few images load faster
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
