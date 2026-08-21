"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Instagram from "../icons/Instagram";

const PROFILE_URL = "https://www.instagram.com/westfrench_academy/";

export default function InstagramGallery() {
  const t = useTranslations("Instagram");
  const [loadInstagram, setLoadInstagram] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadInstagram(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
          className="flex items-center justify-center gap-3 text-3xl font-bold text-[#d24b06]"
        >
          <span className="text-[#006a8f]">
            <Instagram />
          </span>
          {t("title")}
        </h2>
        <p className="mt-3 text-gray-700">{t("subtitle")}</p>

        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-tr from-[#ffa45b] to-[#ff7c5b] px-6 py-3 font-semibold text-white shadow transition-transform duration-300 hover:scale-105"
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
            allowTransparency
            className="lightwidget-widget"
            style={{
              width: "100%",
              minHeight: "400px",
              border: 0,
              overflow: "hidden",
            }}
          />
        ) : (
          /* Reserves the same height so the heading above does not jump when
             the widget loads three seconds in. */
          <div className="w-full" style={{ minHeight: "400px" }} aria-hidden="true" />
        )}
      </div>
    </section>
  );
}