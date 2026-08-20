import Image from "next/image";
import { useTranslations } from "next-intl";

const images = [
  "/gallery/Photo 1.webp",
  "/gallery/Photo 2.webp",
  "/gallery/Photo 3.webp",
  "/gallery/Photo 10.webp",
  "/gallery/Photo 11.webp",
  "/gallery/rennes.webp",
  "/gallery/Photo 15.webp",
  "/gallery/Photo 16.webp",
  "/gallery/Photo 17.webp",
  "/gallery/Photo 18.webp",
  "/gallery/Photo 19.webp",
  "/gallery/Photo 20.webp",
  "/gallery/Photo 21.webp",
  "/gallery/Photo 4.webp",
  "/gallery/Photo 5.webp",
  "/gallery/Photo 6.webp",
  "/gallery/Photo 7.webp",
  "/gallery/Photo 8.webp",
  "/gallery/Photo 9.webp",
];

const Gallery = () => {
  const t = useTranslations("A11y");

  return (
    <div className="columns-2 gap-4 pt-8 space-y-4 w-2/3 sm:columns-3 md:columns-4">
      {images.map((src, index) => (
        <div
          key={src}
          className="break-inside-avoid mb-4"
        >
          <Image
            src={src}
            alt={t("galleryItem", { number: index + 1 })}
            width={300}
            height={300}
            loading="lazy"
            className="w-full h-auto rounded-lg"
            sizes="(max-width: 640px) 33vw, (max-width: 768px) 22vw, 17vw"
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;