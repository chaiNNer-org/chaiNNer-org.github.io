/* eslint-disable @typescript-eslint/explicit-function-return-type */
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { PageShell } from './components/PageShell/PageShell';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr';
import logoUrl from './assets/128x128.png';
import type { PageContextServer } from './types';

async function render(pageContext: PageContextServer) {
    const { Page, pageProps } = pageContext;
    const pageHtml = ReactDOMServer.renderToString(
        <PageShell pageContext={pageContext}>
            <Page {...pageProps} />
        </PageShell>
    );

    // See https://vite-plugin-ssr.com/head
    const { documentProps } = pageContext.exports;
    const title = documentProps?.title ?? 'chaiNNer';
    const desc = documentProps?.description ?? "chaiNNer's website";
    const image = documentProps?.image ?? 'https://chainner.app/banner.png';
    const url = `https://chainner.app${pageContext.urlPathname}`;
    const keywords = documentProps?.keywords ?? 'chaiNNer, image processing, node editor, batch processing, visual programming, workflow automation';

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <!-- Primary Meta Tags -->
        <title>${title}</title>
        <meta name="title" content="${title}" />
        <meta name="description" content="${desc}" />
        <meta name="keywords" content="${keywords}" />
        <link rel="canonical" href="${url}" />

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website" />
        <meta property="og:url" content="${url}" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${desc}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:site_name" content="chaiNNer" />

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="${url}" />
        <meta property="twitter:title" content="${title}" />
        <meta property="twitter:description" content="${desc}" />
        <meta property="twitter:image" content="${image}" />

        <!-- Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "chaiNNer",
          "description": "${desc}",
          "url": "https://chainner.app",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": ["Windows", "macOS", "Linux"],
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "softwareVersion": "latest",
          "image": "${image}",
          "author": {
            "@type": "Organization",
            "name": "chaiNNer-org"
          }
        }
        </script>
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

    return {
        documentHtml,
        pageContext: {
            // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
        },
    };
}
export { render };
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname'];
