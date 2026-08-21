import Image from 'next/image';
import { Link } from '../../../i18n/routing';

/**
 * Summary card for one post on the blog index.
 * Mirrors the cream card styling used across the marketing page.
 */
const BlogCard = ({ post, dateLabel, readMoreLabel, publishedLabel }) => (
  <article className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg flex flex-col gap-4">
    {post.image ? (
      <div className="relative w-full h-[180px] rounded-2xl overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover"
        />
      </div>
    ) : (
      <div
        className="w-full h-[180px] rounded-2xl bg-gradient-to-r from-[#ffa45b] to-[#a3e4db]"
        aria-hidden="true"
      />
    )}

    <h2 className="text-2xl font-semibold text-[#d24b06]">{post.title}</h2>

    {dateLabel && (
      <p className="text-sm text-gray-600">
        {publishedLabel} <time dateTime={post.date}>{dateLabel}</time>
      </p>
    )}

    <p className="text-gray-700 flex-1">{post.excerpt}</p>

    <Link
      href={`/blog/${post.id}`}
      prefetch={false}
      className="self-start bg-gradient-to-tr from-[#ffa45b] to-[#ff7c5b] px-6 py-3 rounded-lg text-white font-semibold shadow hover:scale-105 transition-transform duration-300 ease-out"
    >
      {readMoreLabel}
    </Link>
  </article>
);

export default BlogCard;
