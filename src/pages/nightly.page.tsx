/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';
import '../index.scss';
import { HStack, Icon, Text } from '@chakra-ui/react';
import { MdWarningAmber } from 'react-icons/md/index.js';
import { IGithubRelease } from '../types/githubTypes';
import { ReleasePage } from '../components/ReleasePage';
import { NightlyData, processNightlyReleases } from '../utils/releases';

/** How many past nightlies the page prints in full before linking out to GitHub. */
const NOTES_SHOWN = 10;

/**
 * Starts from the data baked in at build time so the page has content on first
 * paint and in the pre-rendered HTML, then refreshes from GitHub on mount
 * because nightlies land far more often than this site is rebuilt.
 */
function useNightlyData(initialData: NightlyData): { data: NightlyData; stale: boolean } {
    const [data, setData] = useState(initialData);
    const [stale, setStale] = useState(false);

    useEffect(() => {
        let cancelled = false;
        fetch('https://api.github.com/repos/chaiNNer-org/chaiNNer-nightly/releases')
            .then(async (res) => {
                if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
                return (await res.json()) as IGithubRelease[];
            })
            .then((releases) => {
                if (!cancelled) setData(processNightlyReleases(releases, NOTES_SHOWN));
            })
            .catch(() => {
                // Keep whatever the build produced; only say so if that is empty too.
                if (!cancelled) setStale(true);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return { data, stale };
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

function Page({ initialData }: { initialData: NightlyData }) {
    const { data, stale } = useNightlyData(initialData);
    const hasNothing = stale && data.builds.length === 0;

    return (
        <ReleasePage
            archiveHref="https://github.com/chaiNNer-org/chaiNNer-nightly/releases"
            archiveLabel="Every nightly on GitHub"
            builds={data.builds}
            crossLink={{ label: 'Stable downloads', href: '/download' }}
            error={hasNothing ? <Callout tone="error">Could not reach the GitHub API. The nightly releases are still listed on GitHub.</Callout> : undefined}
            intro="Builds made from the latest commit on main. They get whatever has just landed, including whatever has just broken."
            notes={data.notes}
            notesHeading="Build log"
            notice={
                <Callout tone="warning">Nightlies are not tested before release. Keep a stable install around if you rely on chaiNNer for anything.</Callout>
            }
            title="Nightly builds"
            versionDate={undefined}
            versionLabel={data.versionLabel}
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
