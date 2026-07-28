/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PageContextServer } from '../types';
import { POST_META } from '../content/loadPosts';

/** The index only needs titles and dates, so post bodies never reach this page. */
async function onBeforeRender(pageContext: PageContextServer) {
    return {
        pageContext: {
            pageProps: { posts: POST_META },
        },
    };
}

export { onBeforeRender };
