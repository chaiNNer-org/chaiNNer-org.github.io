/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getAllVersions, getLatestVersion } from '../api/api';
import { PageContextServer } from '../types';
import { IGithubRelease } from '../types/githubTypes';

async function onBeforeRender(pageContext: PageContextServer) {
    // `.page.server.js` files always run in Node.js; we could use SQL/ORM queries here.
    const data = await getLatestVersion();

    const dmgBuild = data?.assets.find((asset) => asset.name.endsWith('.dmg'));
    const exeBuild = data?.assets.find((asset) => asset.name.endsWith('.exe'));
    const debBuild = data?.assets.find((asset) => asset.name.endsWith('.deb'));
    const rpmBuild = data?.assets.find((asset) => asset.name.endsWith('.rpm'));

    const zipBuilds = data?.assets.filter((asset) => asset.name.endsWith('.zip'));
    const winZip = zipBuilds?.find((asset) => asset.name.includes('win'));
    const macZip = zipBuilds?.find((asset) => asset.name.includes('mac'));
    const linuxZip = zipBuilds?.find((asset) => asset.name.includes('linux'));

    const allVersions = (await getAllVersions()) ?? [];
    const computedChangelog = allVersions.reduce((acc: string, curr: IGithubRelease) => {
        return `${acc}\n# ${curr.name}\n${curr.body}`;
    }, '');

    // available as `pageContext.pageProps`
    const pageProps = { dmgBuild, exeBuild, debBuild, rpmBuild, winZip, macZip, linuxZip, computedChangelog, latestVersion: data };
    return {
        pageContext: {
            pageProps,
        },
    };
}

export { onBeforeRender };
