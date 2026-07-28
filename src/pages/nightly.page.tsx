/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';
import '../index.scss';
import { HStack, Icon, Text } from '@chakra-ui/react';
import { MdWarningAmber } from 'react-icons/md/index.js';
import { IGithubRelease } from '../types/githubTypes';
import { ReleasePage } from '../components/ReleasePage';
import { formatReleaseDate, linkifyReleaseBody, listBuilds, PlatformBuild, ReleaseNote } from '../utils/releases';

/** How many past nightlies the page prints in full before linking out to GitHub. */
const NOTES_SHOWN = 10;

interface NightlyData {
    versionLabel: string | undefined;
    versionDate: string | undefined;
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
    const date = formatReleaseDate(release);
    return {
        title: date ?? release.tag_name ?? 'Nightly build',
        date: undefined,
        body: linkifyReleaseBody(cleanNightlyBody(release)),
        href: release.html_url,
    };
}

function processReleases(allVersions: IGithubRelease[]): NightlyData {
    const ordered = allVersions
        .filter((release) => !release.draft)
        .sort((a, b) => new Date(b.published_at ?? b.created_at).getTime() - new Date(a.published_at ?? a.created_at).getTime());

    const latest = ordered[0];

    return {
        versionLabel: formatReleaseDate(latest) ?? latest?.tag_name,
        versionDate: undefined,
        builds: listBuilds(latest),
        notes: ordered.slice(0, NOTES_SHOWN).map(toNightlyNote),
    };
}

function useNightlyData() {
    const [data, setData] = useState<NightlyData | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('https://api.github.com/repos/chaiNNer-org/chaiNNer-nightly/releases')
            .then(async (res) => {
                if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
                return (await res.json()) as IGithubRelease[];
            })
            .then((releases) => {
                setData(processReleases(releases));
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    return { data, error };
}

function Callout({ tone, children }: { tone: 'warning' | 'error'; children: React.ReactNode }) {
    const color = tone === 'warning' ? 'orange.200' : 'red.200';
    return (
        <HStack
            align="start"
            spacing={3}
        >
            <Icon
                as={MdWarningAmber}
                boxSize={5}
                color={color}
                mt="1px"
                aria-hidden
            />
            <Text
                fontSize="sm"
                color={color}
                lineHeight="1.6"
            >
                {children}
            </Text>
        </HStack>
    );
}

function Page() {
    const { data, error } = useNightlyData();
    const isLoading = data === null && !error;

    return (
        <ReleasePage
            archiveHref="https://github.com/chaiNNer-org/chaiNNer-nightly/releases"
            archiveLabel="Every nightly on GitHub"
            builds={data?.builds ?? []}
            crossLink={{ label: 'Stable downloads', href: '/download' }}
            error={error ? <Callout tone="error">Could not reach the GitHub API. The nightly releases are still listed on GitHub.</Callout> : undefined}
            intro="Builds made from the latest commit on main. They get whatever has just landed, including whatever has just broken."
            isLoading={isLoading}
            notes={data?.notes ?? []}
            notesHeading="Build log"
            notice={
                <Callout tone="warning">Nightlies are not tested before release. Keep a stable install around if you rely on chaiNNer for anything.</Callout>
            }
            title="Nightly builds"
            versionDate={data?.versionDate}
            versionLabel={data?.versionLabel}
        />
    );
}

export { Page };

export const documentProps = {
    title: 'chaiNNer Nightly Builds - Latest Development Releases',
    description:
        'Download the latest nightly builds of chaiNNer with cutting-edge features and improvements. Experimental builds for Windows, macOS, and Linux with the newest image processing capabilities.',
    keywords: 'chaiNNer nightly, development builds, experimental features, beta version, latest updates',
    image: 'https://chainner.app/banner.png',
};
