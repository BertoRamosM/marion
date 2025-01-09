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
            src="/gallery/Photo 1.jpg"
            alt="Photo 4"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 2.jpg"
            alt="Photo 5"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 3.jpg"
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
            src="/gallery/Photo 4.jpg"
            alt="Photo 7"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 5.jpg"
            alt="Photo 8"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 6.jpg"
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
            src="/gallery/Photo 7.jpg"
            alt="Photo 4"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 8.jpg"
            alt="Photo 5"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 9.jpg"
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
            src="/gallery/Photo 10.jpg"
            alt="Photo 7"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 11.jpg"
            alt="Photo 8"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/gallery/Photo 12.jpg"
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
