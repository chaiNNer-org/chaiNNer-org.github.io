/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getAllNightlyVersions, getLatestNightly } from '../api/api';
import { PageContextServer } from '../types';
import { IGithubRelease } from '../types/githubTypes';

async function onBeforeRender(pageContext: PageContextServer) {
    const data = await getLatestNightly();

    const dmgBuild = data?.assets.find((asset) => asset.name.endsWith('.dmg'));
    const exeBuild = data?.assets.find((asset) => asset.name.endsWith('.exe'));
    const debBuild = data?.assets.find((asset) => asset.name.endsWith('.deb'));
    const rpmBuild = data?.assets.find((asset) => asset.name.endsWith('.rpm'));

    const zipBuilds = data?.assets.filter((asset) => asset.name.endsWith('.zip'));
    const winZip = zipBuilds?.find((asset) => asset.name.includes('win'));
    const macZip = zipBuilds?.find((asset) => asset.name.includes('mac'));
    const linuxZip = zipBuilds?.find((asset) => asset.name.includes('linux'));

    const allVersions = (await getAllNightlyVersions()) ?? [];
    const ordered = allVersions
        .filter((r) => !r.draft)
        .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime());

    const latest = data ?? ordered[0];
    const previous = ordered.filter((r) => (latest ? r.id !== latest.id : true));

    const latestChangelog = latest ? `# ${latest.name}\n${latest.body ?? ''}` : '';
    const previousChangelog = previous.reduce((acc: string, curr: IGithubRelease) => {
        return `${acc}\n# ${curr.name}\n${curr.body ?? ''}`;
    }, '');

    const pageProps = {
        dmgBuild,
        exeBuild,
        debBuild,
        rpmBuild,
        winZip,
        macZip,
        linuxZip,
        latestChangelog,
        previousChangelog,
        latestVersion: latest,
    };
    return {
        pageContext: {
            pageProps,
        },
    };
}

export { onBeforeRender };
