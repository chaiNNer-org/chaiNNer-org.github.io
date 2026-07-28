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
    // A page with a dynamic route sets documentProps in onBeforeRender, since a
    // static export cannot vary by URL. That wins over the static one.
    const documentProps = pageContext.documentProps ?? pageContext.exports.documentProps;
    const title = documentProps?.title ?? 'chaiNNer';
    const desc = documentProps?.description ?? "chaiNNer's website";
    const image = documentProps?.image ?? 'https://chainner.app/banner.png';
    const url = `https://chainner.app${pageContext.urlPathname}`;
    const keywords = documentProps?.keywords ?? 'chaiNNer, image processing, node editor, batch processing, visual programming, workflow automation';

    /*
     * The error page is pre-rendered against a placeholder URL, so a canonical
     * link would point somewhere that does not exist. Send crawlers away from
     * it instead, and leave the canonical, og:url, and structured data off.
     */
    const noindex = documentProps?.noindex === true;
    const indexTags = noindex
        ? '<meta name="robots" content="noindex, follow" />'
        : `<link rel="canonical" href="${url}" />
        <meta property="og:url" content="${url}" />
        <meta property="twitter:url" content="${url}" />`;

    /*
     * Describes the application, unless the page says it is something else.
     * A blog post is a BlogPosting with its own author and date, which is what
     * lets a search engine attribute it rather than reading every post as
     * another copy of the app listing.
     */
    const schema = documentProps?.jsonLd ?? {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'chaiNNer',
        description: desc,
        url: 'https://chainner.app',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: ['Windows', 'macOS', 'Linux'],
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        softwareVersion: 'latest',
        image,
        author: { '@type': 'Organization', name: 'chaiNNer-org' },
    };

    // Escaping `<` keeps a stray `</script>` in any string from closing the tag.
    const structuredData = noindex ? '' : `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1a202c" />

        <!-- Inter and JetBrains Mono. The theme asks for both; without this they silently fall back to system faces. -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />

        <!-- Primary Meta Tags -->
        <title>${title}</title>
        <meta name="title" content="${title}" />
        <meta name="description" content="${desc}" />
        <meta name="keywords" content="${keywords}" />
        ${dangerouslySkipEscape(indexTags)}

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${desc}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:site_name" content="chaiNNer" />

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="${title}" />
        <meta property="twitter:description" content="${desc}" />
        <meta property="twitter:image" content="${image}" />

        ${dangerouslySkipEscape(structuredData)}
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
