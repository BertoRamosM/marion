"use client";

import { useEffect, useState } from "react";

export default function InstagramGallery() {
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

  if (!loadInstagram) {
    return (
      <div
        className="w-full"
        style={{ minHeight: "400px" }}
        aria-hidden="true"
      />
    );
  }

  return (
    <iframe
      src="https://cdn.lightwidget.com/widgets/7c5f5f5978a959e6a00d60b3ede6ec51.html"
      scrolling="no"
      title="Instagram gallery"
      allowTransparency
      className="lightwidget-widget"
      style={{
        width: "100%",
        minHeight: "400px",
        border: 0,
        overflow: "hidden",
      }}
    />
  );
}