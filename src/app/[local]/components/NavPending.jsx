'use client';

import { useLinkStatus } from 'next/link';

/*
 * A small spinner that appears inside a link while its page is on the way.
 *
 * Drop it as a child of any <Link> that goes to a real page — FAQ, legal
 * notice, blog — and it shows for exactly as long as that navigation is
 * pending. Anchor links to sections on the current page never suspend, so it
 * simply never appears on those.
 *
 * WHY NOT loading.js
 *
 * The obvious approach is a route-level loading.js boundary. It was tried and
 * removed: these routes are prerendered static, and adding a boundary left the
 * segment postponed and unresolved, so the FAQ page rendered its spinner with
 * the real content stuck inside a hidden div. A per-link indicator cannot break
 * page rendering, because it lives in the link rather than in the page shell.
 *
 * The trade-off is honest: this covers clicks on links, not the browser's back
 * and forward buttons, which loading.js would have. On pages this size that is
 * the better side of the trade.
 *
 * border-current rather than a palette colour: it inherits whatever the link
 * already uses, so it reads correctly on the mint header bar, in the footer,
 * and in both colour schemes without a token of its own.
 */
const NavPending = () => {
  const { pending } = useLinkStatus();

  if (!pending) return null;

  return (
    <span
      aria-hidden="true"
      className="ml-2 inline-block h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent align-[-0.15em] motion-reduce:animate-none"
    />
  );
};

export default NavPending;
