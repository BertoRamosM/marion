import React from 'react';
import Image from 'next/image';

const Gallery = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
      {/* Column 1 */}
      <div className="grid gap-4">
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 1.webp"
            alt="Photo 4"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 2.webp"
            alt="Photo 5"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 3.webp"
            alt="Photo 6"
            width={150}
            height={150}
          />
        </div>
      </div>

      {/* Column 2 */}
      <div className="grid gap-4">
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 4.webp"
            alt="Photo 7"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 5.webp"
            alt="Photo 8"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 6.webp"
            alt="Photo 9"
            width={150}
            height={150}
          />
        </div>
      </div>

      {/* Column 3 */}
      <div className="grid gap-4">
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 7.webp"
            alt="Photo 4"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 8.webp"
            alt="Photo 5"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 9.webp"
            alt="Photo 6"
            width={150}
            height={150}
          />
        </div>
      </div>

      {/* Column 4 */}
      <div className="grid gap-4">
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 10.webp"
            alt="Photo 7"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 11.webp"
            alt="Photo 8"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/rennes.webp"
            alt="Photo 9"
            width={150}
            height={150}
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
