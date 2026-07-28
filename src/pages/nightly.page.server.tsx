/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getAllNightlyVersions } from '../api/api';
import { PageContextServer } from '../types';
import { processNightlyReleases } from '../utils/releases';

/** How many past nightlies the page prints in full before linking out to GitHub. */
const NOTES_SHOWN = 10;

/**
 * Nightlies used to be fetched only in the browser, which left the pre-rendered
 * page as a spinner with nothing for a crawler to read. Render them at build
 * time instead. The page still refreshes itself on mount, since nightlies land
 * far more often than this site gets rebuilt.
 */
async function onBeforeRender(pageContext: PageContextServer) {
    const releases = (await getAllNightlyVersions()) ?? [];

    return {
        pageContext: {
            pageProps: {
                initialData: processNightlyReleases(releases, NOTES_SHOWN),
            },
        },
    };
}

export { onBeforeRender };
