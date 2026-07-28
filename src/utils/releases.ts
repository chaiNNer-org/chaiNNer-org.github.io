import { IGithubRelease, IReleaseAsset } from '../types/githubTypes';

export interface ReleaseNote {
    /** Display name for the release, e.g. `Alpha v0.25.1`. */
    title: string;
    /** ISO date (YYYY-MM-DD) the release was published, when GitHub reports one. */
    date: string | undefined;
    /** Markdown body, already linkified. */
    body: string;
    /** Link to the release on GitHub. */
    href: string;
}

export interface PlatformBuild {
    /** `Windows`, `macOS`, `Linux`. */
    platform: string;
    /** What kind of build it is, e.g. `Installer` or `Portable`. */
    kind: string;
    /** File extension, shown as the concrete thing you get. */
    format: string;
    asset: IReleaseAsset;
}

/** Which `OS.name` values from ua-parser map onto which platform label. */
export const OS_TO_PLATFORM: Record<string, string> = {
    Windows: 'Windows',
    'Mac OS': 'macOS',
    Linux: 'Linux',
    Debian: 'Linux',
    RedHat: 'Linux',
};

export function formatFileSize(bytes: number): string {
    if (!Number.isFinite(bytes) || bytes <= 0) return '';
    const mb = bytes / 1024 / 1024;
    if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
    return `${Math.round(mb)} MB`;
}

export function formatReleaseDate(release: IGithubRelease | undefined): string | undefined {
    const dateString = release?.published_at ?? release?.created_at;
    if (dateString == null) return undefined;
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return undefined;
    return date.toISOString().split('T')[0];
}

/**
 * Every downloadable build in a release, grouped so someone on a different
 * machine than the one they are browsing from can still find their installer.
 */
export function listBuilds(release: IGithubRelease | undefined): PlatformBuild[] {
    const assets = release?.assets ?? [];
    const find = (predicate: (name: string) => boolean): IReleaseAsset | undefined => assets.find((a) => predicate(a.name.toLowerCase()));

    const candidates: Array<[string, string, string, IReleaseAsset | undefined]> = [
        ['Windows', 'Installer', '.exe', find((n) => n.endsWith('.exe'))],
        ['Windows', 'Portable', '.zip', find((n) => n.endsWith('.zip') && n.includes('win'))],
        ['macOS', 'Installer', '.dmg', find((n) => n.endsWith('.dmg'))],
        ['macOS', 'Portable', '.zip', find((n) => n.endsWith('.zip') && n.includes('mac'))],
        ['Linux', 'Debian, Ubuntu', '.deb', find((n) => n.endsWith('.deb'))],
        ['Linux', 'Fedora, RHEL', '.rpm', find((n) => n.endsWith('.rpm'))],
        ['Linux', 'Portable', '.zip', find((n) => n.endsWith('.zip') && n.includes('linux'))],
    ];

    return candidates
        .filter((c): c is [string, string, string, IReleaseAsset] => c[3] != null)
        .map(([platform, kind, format, asset]) => ({ platform, kind, format, asset }));
}

/** The build a visitor on `platform` most likely wants: the installer, else the portable build. */
export function preferredBuild(builds: PlatformBuild[], platform: string | undefined, osName: string | undefined): PlatformBuild | undefined {
    if (platform == null) return undefined;
    const onPlatform = builds.filter((b) => b.platform === platform);
    if (osName === 'RedHat') return onPlatform.find((b) => b.format === '.rpm') ?? onPlatform[0];
    if (osName === 'Debian') return onPlatform.find((b) => b.format === '.deb') ?? onPlatform[0];
    return onPlatform.find((b) => b.kind === 'Installer') ?? onPlatform.find((b) => b.format === '.deb') ?? onPlatform[0];
}

const MARKDOWN_LINK = /\[[^\]]*\]\([^)]*\)/g;
const PULL_URL = /https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/pull\/(\d+)/g;
const COMPARE_URL = /https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/compare\/(\S+)/g;
const BARE_URL = /https?:\/\/[^\s<>()[\]]+/g;
const MENTION = /(^|[\s(])@([A-Za-z\d](?:[A-Za-z\d-]{0,37}[A-Za-z\d])?)\b/g;

/** Runs `transform` over everything except the markdown links already in the text. */
function outsideLinks(markdown: string, transform: (chunk: string) => string): string {
    let result = '';
    let lastIndex = 0;
    for (const match of markdown.matchAll(MARKDOWN_LINK)) {
        result += transform(markdown.slice(lastIndex, match.index));
        result += match[0];
        lastIndex = (match.index ?? 0) + match[0].length;
    }
    return result + transform(markdown.slice(lastIndex));
}

/**
 * GitHub release bodies arrive as plain text with naked URLs in them, and
 * react-markdown does not autolink without remark-gfm. Rather than pull in
 * another dependency, turn the URLs that actually occur into real links: pull
 * requests become `#1234`, compare links become the tag range, contributors
 * become their profile. Each pass leaves the links made by earlier ones alone.
 */
export function linkifyReleaseBody(markdown: string): string {
    return [
        (chunk: string) => chunk.replace(PULL_URL, (url, number: string) => `[#${number}](${url})`),
        (chunk: string) => chunk.replace(COMPARE_URL, (url, range: string) => `[${range}](${url})`),
        (chunk: string) => chunk.replace(BARE_URL, (url) => `[${url.replace(/^https?:\/\//, '')}](${url})`),
        (chunk: string) => chunk.replace(MENTION, (_match, lead: string, user: string) => `${lead}[@${user}](https://github.com/${user})`),
    ].reduce((text, pass) => outsideLinks(text, pass), markdown);
}

export interface NightlyData {
    versionLabel: string | undefined;
    builds: PlatformBuild[];
    notes: ReleaseNote[];
}

/**
 * Nightly bodies are a loose dump of commit lines rather than a written
 * changelog, with the build date repeated inside them and stray quotes from the
 * workflow that generates them. Turn that into one clean bullet list.
 */
function cleanNightlyBody(release: IGithubRelease): string {
    const dateLabel = formatReleaseDate(release);
    const body = release.body;
    if (body == null) return '';

    const lines = body
        .replace(/\r\n/g, '\n')
        .replace(/'\s+'/g, '\n')
        .replace(/'\s*\n/g, '\n')
        .replace(/\n\s*'/g, '\n')
        .split('\n')
        .map((line) =>
            line
                .replace(/Built on\s+\d{4}-\d{2}-\d{2}/gi, '')
                .replace(/\s{2,}/g, ' ')
                .trim()
        )
        .filter((line) => line.length > 0)
        .filter((line) => line !== dateLabel);

    return lines.map((line) => `- ${line}`).join('\n');
}

function toNightlyNote(release: IGithubRelease): ReleaseNote {
    return {
        title: formatReleaseDate(release) ?? release.tag_name ?? 'Nightly build',
        date: undefined,
        body: linkifyReleaseBody(cleanNightlyBody(release)),
        href: release.html_url,
    };
}

/**
 * Shared by the nightly page's build-time render and its client-side refresh,
 * so a crawler and a visitor are looking at the same thing.
 */
export function processNightlyReleases(allVersions: IGithubRelease[], notesShown: number): NightlyData {
    const ordered = allVersions
        .filter((release) => !release.draft)
        .sort((a, b) => new Date(b.published_at ?? b.created_at).getTime() - new Date(a.published_at ?? a.created_at).getTime());

    const latest = ordered[0];

    return {
        versionLabel: formatReleaseDate(latest) ?? latest?.tag_name,
        builds: listBuilds(latest),
        notes: ordered.slice(0, notesShown).map(toNightlyNote),
    };
}

/** Turns a GitHub release into the shape the release page renders. */
export function toReleaseNote(release: IGithubRelease): ReleaseNote {
    return {
        title: release.name?.trim() !== '' ? release.name : release.tag_name,
        date: formatReleaseDate(release),
        body: linkifyReleaseBody((release.body ?? '').replace(/\r\n/g, '\n').trim()),
        href: release.html_url,
    };
}
