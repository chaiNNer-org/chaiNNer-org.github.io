/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { PageShell } from './PageShell';
import type { PageContextClient } from './types';

async function render(pageContext: PageContextClient) {
    const { Page, pageProps } = pageContext;
    hydrateRoot(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById('page-view')!,
        <PageShell pageContext={pageContext}>
            <Page {...pageProps} />
        </PageShell>
    );
}

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
export { render };
