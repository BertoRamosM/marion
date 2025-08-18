'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";

// Structure images by columns to match your layout
const columns = [
  ["/gallery/Photo 1.webp", "/gallery/Photo 2.webp", "/gallery/Photo 3.webp"],
  ["/gallery/Photo 4.webp", "/gallery/Photo 5.webp", "/gallery/Photo 6.webp"],
  ["/gallery/Photo 7.webp", "/gallery/Photo 8.webp", "/gallery/Photo 9.webp"],
  ["/gallery/Photo 10.webp", "/gallery/Photo 11.webp", "/gallery/rennes.webp"],
];

const Gallery = () => {
  const [visibleColumns, setVisibleColumns] = useState(
    Array(columns.length).fill([]) // initially empty arrays for each column
  );

  useEffect(() => {
    columns.forEach((col, colIndex) => {
      col.forEach((img, imgIndex) => {
        setTimeout(() => {
          setVisibleColumns((prev) => {
            const newCols = [...prev];
            newCols[colIndex] = [...newCols[colIndex], img];
            return newCols;
          });
        }, (imgIndex + colIndex * 3) * 150); // staggered delay
      });
    });
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
      {visibleColumns.map((col, colIndex) => (
        <div key={colIndex} className="grid gap-4">
          {col.map((src, index) => (
            <div key={index}>
              <Image
                className="h-auto max-w-full rounded-lg transition-opacity duration-500 opacity-100"
                src={src}
                alt={`Photo ${colIndex * 3 + index + 1}`}
                width={150}
                height={150}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Gallery;
