import Image from 'next/image';
import { Link } from '../../../i18n/routing';
import NavPending from './NavPending';

/**
 * Summary card for one post on the blog index.
 * Mirrors the cream card styling used across the marketing page.
 *
 * The whole card is clickable, not just the button. People aim at cards, and a
 * 380x500 target beats a 140x48 one — especially with a thumb.
 *
 * It is done with a stretched pseudo-element on the link rather than by
 * wrapping the card in one, which is the same trick DisclosureCard uses. The
 * reason is that wrapping would nest the "read more" link inside a bigger
 * link — invalid HTML — or force the button to stop being a link, which loses
 * the accessible name and the keyboard target. This way there is still exactly
 * one real link, with real text, and the invisible layer simply extends its
 * hit area over the card.
 *
 * The card is `relative` so that layer has something to stretch to, and
 * `group` so hovering anywhere lifts the button rather than only hovering the
 * button itself.
 */
const BlogCard = ({ post, dateLabel, readMoreLabel, publishedLabel }) => (
  <article className="group relative bg-cream p-8 rounded-3xl shadow-lg flex flex-col gap-4 transition-shadow duration-300 hover:shadow-xl">
    {post.image ? (
      <div className="relative w-full h-[180px] rounded-2xl overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    ) : (
      <div
        className="w-full h-[180px] rounded-2xl bg-gradient-to-r from-ember to-mint"
        aria-hidden="true"
      />
    )}

    <h2 className="text-2xl font-semibold text-rust-lg">{post.title}</h2>

    {dateLabel && (
      <p className="text-sm text-ink-600">
        {publishedLabel} <time dateTime={post.date}>{dateLabel}</time>
      </p>
    )}

    <p className="text-ink-700 flex-1">{post.excerpt}</p>

    {/*
      after:inset-0 stretches an invisible layer from this link across the
      whole card, so a click anywhere follows it. z-[5] keeps that layer above
      the card's own content but below anything that needs its own click later.
    */}
    <Link
      href={`/blog/${post.id}`}
      prefetch={false}
      className="self-start bg-gradient-to-tr from-ember to-ember-deep px-6 py-3 rounded-lg text-on-ember font-semibold shadow transition-transform duration-300 ease-out group-hover:scale-105 after:absolute after:inset-0 after:z-[5] after:content-['']"
    >
      {readMoreLabel}
      {/* Spins while the article is on its way. prefetch is off on these
          links, so on a slow connection the wait is real and worth showing. */}
      <NavPending />
    </Link>
  </article>
);

export default BlogCard;
