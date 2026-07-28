/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getRepoInfo } from '../api/api';
import { PageContextServer } from '../types';

/**
 * The star count is baked in at build time, the same way the download page
 * bakes release data, so the page ships it in its HTML instead of every
 * visitor paying for a GitHub API call. If the API is unreachable or rate
 * limited during a build, `stars` is undefined and the button simply renders
 * without it.
 */
async function onBeforeRender(pageContext: PageContextServer) {
    const repo = await getRepoInfo();

    return {
        pageContext: {
            pageProps: {
                stars: repo?.stargazers_count,
            },
        },
    };
}

export { onBeforeRender };
