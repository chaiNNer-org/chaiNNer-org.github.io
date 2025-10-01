/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getAllVersions, getLatestVersion } from '../api/api';
import { PageContextServer } from '../types';

async function onBeforeRender(pageContext: PageContextServer) {
    const allVersions = (await getAllVersions()) ?? [];
    const ordered = allVersions
        .filter((r) => !r.draft)
        .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime());

    const latestFromList = ordered[0];
    const data = await getLatestVersion();
    const latest = data ?? latestFromList;
    const release = latest ?? null;

    const dmgBuild = release?.assets.find((asset) => asset.name.endsWith('.dmg'));
    const exeBuild = release?.assets.find((asset) => asset.name.endsWith('.exe'));
    const debBuild = release?.assets.find((asset) => asset.name.endsWith('.deb'));
    const rpmBuild = release?.assets.find((asset) => asset.name.endsWith('.rpm'));

    const zipBuilds = release?.assets.filter((asset) => asset.name.endsWith('.zip'));
    const winZip = zipBuilds?.find((asset) => asset.name.includes('win'));
    const macZip = zipBuilds?.find((asset) => asset.name.includes('mac'));
    const linuxZip = zipBuilds?.find((asset) => asset.name.includes('linux'));

    const previousReleases = ordered.filter((r) => (latest ? r.id !== latest.id : true));

    // available as `pageContext.pageProps`
    const pageProps = { dmgBuild, exeBuild, debBuild, rpmBuild, winZip, macZip, linuxZip, latestVersion: latest, previousReleases };
    return {
        pageContext: {
            pageProps,
        },
    };
}

export { onBeforeRender };
