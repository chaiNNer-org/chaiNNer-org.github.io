import type { PageContextBuiltIn } from 'vite-plugin-ssr';
// import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client/router' // When using Client Routing
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client';

type Page = (pageProps: PageProps) => React.ReactElement;
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/ban-types
type PageProps = {};

export interface PageContextCustom {
    Page: Page;
    pageProps?: PageProps;
    urlPathname: string;
    exports: {
        documentProps?: {
            title?: string;
            description?: string;
            keywords?: string;
            image?: string;
            /** Keeps the page out of search indexes, and out of canonical and structured data. */
            noindex?: boolean;
        };
    };
}

type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom;
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom;

type PageContext = PageContextClient | PageContextServer;

export type { PageContextServer };
export type { PageContextClient };
export type { PageContext };
export type { PageProps }; // When using Server Routing
