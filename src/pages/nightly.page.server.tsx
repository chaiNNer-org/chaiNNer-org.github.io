/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getAllNightlyVersions } from '../api/api';
import { PageContextServer } from '../types';
import { IGithubRelease } from '../types/githubTypes';

async function onBeforeRender(pageContext: PageContextServer) {
    const allVersions = (await getAllNightlyVersions()) ?? [];
    const ordered = allVersions
        .filter((r) => !r.draft)
        .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime());

    const latest = ordered[0];

    const dmgBuild = latest?.assets.find((asset) => asset.name.endsWith('.dmg'));
    const exeBuild = latest?.assets.find((asset) => asset.name.endsWith('.exe'));
    const debBuild = latest?.assets.find((asset) => asset.name.endsWith('.deb'));
    const rpmBuild = latest?.assets.find((asset) => asset.name.endsWith('.rpm'));

    const zipBuilds = latest?.assets.filter((asset) => asset.name.endsWith('.zip'));
    const winZip = zipBuilds?.find((asset) => asset.name.includes('win'));
    const macZip = zipBuilds?.find((asset) => asset.name.includes('mac'));
    const linuxZip = zipBuilds?.find((asset) => asset.name.includes('linux'));

    const cleanReleaseBody = (release: IGithubRelease) => {
        const body = release.body;
        const dateLabel = formatReleaseDate(release);
        if (body == null) return '';

        const normalized = body
            .replace(/\r\n/g, '\n')
            .replace(/'\s+'/g, '\n')
            .replace(/'\s*\n/g, '\n')
            .replace(/\n\s*'/g, '\n');

        const lines = normalized
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
            .filter((line) => !/^Built on\s+\d{4}-\d{2}-\d{2}$/i.test(line))
            .filter((line) => (dateLabel == null ? true : line !== dateLabel));

        const cleaned = lines
            .map((line) => {
                const withoutDate = line.replace(/Built on\s+\d{4}-\d{2}-\d{2}/gi, '').trim();
                return withoutDate.replace(/\s{2,}/g, ' ').trim();
            })
            .filter((line) => line.length > 0);

        if (cleaned.length === 0) return '';
        return cleaned.map((line) => `- ${line}`).join('\n');
    };

    const formatReleaseDate = (release?: IGithubRelease) => {
        const dateString = release?.published_at ?? release?.created_at;
        if (dateString == null) return undefined;
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return undefined;
        return date.toISOString().split('T')[0];
    };

    const releaseToMarkdown = (release: IGithubRelease) => {
        const dateHeading = formatReleaseDate(release) ?? release.tag_name ?? 'Nightly build';
        const body = cleanReleaseBody(release);
        return body.length > 0 ? `# ${dateHeading}\n\n${body}` : `# ${dateHeading}`;
    };

    const computedChangelog = ordered.reduce((acc: string, curr: IGithubRelease) => {
        return `${acc}\n${releaseToMarkdown(curr)}`;
    }, '');

    const pageProps = {
        dmgBuild,
        exeBuild,
        debBuild,
        rpmBuild,
        winZip,
        macZip,
        linuxZip,
        latestVersion: latest,
        computedChangelog,
        releaseDate: formatReleaseDate(latest),
    };
    return {
        pageContext: {
            pageProps,
        },
    };
}

export { onBeforeRender };
