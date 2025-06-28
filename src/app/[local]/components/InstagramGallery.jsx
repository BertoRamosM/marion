'use client'; // Only if you're using App Router

import { useEffect } from 'react';

export default function InstagramGallery() {
    useEffect(() => {
        // Only add the script once
        const scriptId = 'lightwidget-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
            <iframe
                src="//lightwidget.com/widgets/7c5f5f5978a959e6a00d60b3ede6ec51.html"
                scrolling="no"
                allowTransparency={true}
                className="lightwidget-widget"
                style={{ width: '100%', border: 0, overflow: 'hidden' }}
            />
        </div>
    );
}