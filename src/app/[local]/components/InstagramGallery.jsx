'use client'; // Only if you're using App Router

import { useEffect } from 'react';

export default function InstagramGallery() {
    useEffect(() => {
        const scriptId = 'lightwidget-script';

        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
            script.id = scriptId;
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <iframe
            src="https://cdn.lightwidget.com/widgets/7c5f5f5978a959e6a00d60b3ede6ec51.html"
            scrolling="no"
            allowTransparency="true"
            className="lightwidget-widget"
            style={{
                width: '100%',
                border: 0,
                overflow: 'hidden',
            }}
        ></iframe>
    );
};