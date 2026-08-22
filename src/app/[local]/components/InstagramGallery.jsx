"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Instagram from "../icons/Instagram";

const PROFILE_URL = "https://www.instagram.com/westfrench_academy/";

export default function InstagramGallery() {
  const t = useTranslations("Instagram");
  const [loadInstagram, setLoadInstagram] = useState(false);
  const placeholderRef = useRef(null);

  /*
   * Loads when the visitor scrolls the gallery into view, rather than on a
   * three-second timer after page load.
   *
   * This section sits at the very bottom of a long page, so most visitors
   * never reach it — which means the third-party script and the request to
   * LightWidget usually never happen at all, and never on initial load.
   *
   * rootMargin starts the load slightly before the gallery is on screen so it
   * has a head start; the observer disconnects after firing once.
   */
  useEffect(() => {
    if (loadInstagram) return;

    const target = placeholderRef.current;
    if (!target) return;

    // Very old browsers: just load it rather than showing an empty box forever.
    if (typeof IntersectionObserver === "undefined") {
      setLoadInstagram(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setLoadInstagram(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [loadInstagram]);

  useEffect(() => {
    if (!loadInstagram) return;

    const scriptId = "lightwidget-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.lightwidget.com/widgets/lightwidget.js";
      script.id = scriptId;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [loadInstagram]);

  return (
    <section aria-labelledby="instagram-heading">
      {/* The grid alone gave no clue what it was or that it led anywhere.
          A heading plus an explicit profile link makes both obvious. */}
      <div className="text-center">
        <h2
          id="instagram-heading"
          className="flex items-center justify-center gap-3 text-3xl font-bold text-rust-lg"
        >
          <span className="text-brand">
            <Instagram />
          </span>
          {t("title")}
        </h2>
        <p className="mt-3 text-ink-700">{t("subtitle")}</p>

        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-tr from-ember to-ember-deep px-6 py-3 font-semibold text-on-ember shadow transition-transform duration-300 hover:scale-105"
        >
          <Instagram />
          {t("cta")}
        </a>
      </div>

      <div className="mt-8">
        {loadInstagram ? (
          <iframe
            src="https://cdn.lightwidget.com/widgets/7c5f5f5978a959e6a00d60b3ede6ec51.html"
            scrolling="no"
            title={t("title")}
            /* allowTransparency removed: an obsolete IE-era attribute that
               React rejects, logging a console error on every render. */
            className="lightwidget-widget"
            style={{
              width: "100%",
              minHeight: "400px",
              border: 0,
              overflow: "hidden",
            }}
          />
        ) : (
          /* The observer watches this element, and it reserves the widget's
             400px so nothing below jumps when the real gallery arrives. */
          <div
            ref={placeholderRef}
            className="w-full"
            style={{ minHeight: "400px" }}
            aria-hidden="true"
          />
        )}
      </div>
    </section>
  );
}