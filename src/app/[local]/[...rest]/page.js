import { notFound } from 'next/navigation';

/*
 * Catches any path under a valid locale that nothing else claimed, so that
 * not-found.js can render instead of Next's built-in 404.
 *
 * The distinction is easy to miss: [local]/not-found.js only renders when
 * notFound() is CALLED from a route that matched. A path like /fr/typo matches
 * nothing inside [local] at all, so without this file Next falls through to
 * its own root 404 — no header, no navigation, no link back, and English text
 * for a French visitor. Adding a route that matches everything left over and
 * immediately 404s is what routes those paths through our own page.
 *
 * Route priority means this is only ever the last resort: static segments
 * (/faq, /blog) win, then single dynamic ones ([offer]), then this.
 *
 * The response is still a real 404 — notFound() sets the status. This is not
 * a soft 404 dressed up as one.
 */
export default function CatchAllNotFound() {
  notFound();
}
