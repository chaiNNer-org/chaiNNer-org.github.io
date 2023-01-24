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

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
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
