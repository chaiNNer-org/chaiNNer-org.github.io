/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getAllVersions, getLatestVersion } from '../api/api';
import { PageContextServer } from '../types';
import { formatReleaseDate, listBuilds, toReleaseNote } from '../utils/releases';

/** How many past releases the page prints in full before linking out to GitHub. */
const NOTES_SHOWN = 8;

async function onBeforeRender(pageContext: PageContextServer) {
    const latest = await getLatestVersion();
    const allVersions = (await getAllVersions()) ?? [];

    const notes = allVersions
        .filter((release) => !release.draft && !release.prerelease)
        .sort((a, b) => new Date(b.published_at ?? b.created_at).getTime() - new Date(a.published_at ?? a.created_at).getTime())
        .slice(0, NOTES_SHOWN)
        .map(toReleaseNote);

    const pageProps = {
        versionLabel: latest?.name ?? latest?.tag_name,
        versionDate: formatReleaseDate(latest),
        builds: listBuilds(latest),
        notes,
    };

    return {
        pageContext: {
            pageProps,
        },
    };
}

export { onBeforeRender };
