/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';
import banner from '../assets/banner.png';
import '../index.scss';
import { Box, Button, HStack, Icon, Image, Link, Spacer, Spinner, Text, VStack, Alert, AlertIcon } from '@chakra-ui/react';
import { IGithubRelease, IReleaseAsset } from '../types/githubTypes';
import { OS, isSupportedOS } from '../utils';
import { BsWindows, BsApple, BsFillQuestionDiamondFill } from 'react-icons/bs/index.js';
import { FaLinux } from 'react-icons/fa/index.js';
import { MdDownload } from 'react-icons/md/index.js';
import ReactMarkdown from 'react-markdown';
import { GitHubButton } from '../components/buttons/GitHubButton';
import { DiscordButton } from '../components/buttons/DiscordButton';
import { KofiButton } from '../components/buttons/KofiButton';
import { ShellWrapper } from '../components/PageShell/PageShell';
import ChakraUIRenderer from '../utils/chakra-ui-markdown-renderer';

interface NightlyData {
    latestVersion: IGithubRelease | undefined;
    dmgBuild: IReleaseAsset | undefined;
    exeBuild: IReleaseAsset | undefined;
    debBuild: IReleaseAsset | undefined;
    rpmBuild: IReleaseAsset | undefined;
    winZip: IReleaseAsset | undefined;
    macZip: IReleaseAsset | undefined;
    linuxZip: IReleaseAsset | undefined;
    releaseDate: string | undefined;
    computedChangelog: string;
}

function formatReleaseDate(release?: IGithubRelease) {
    const dateString = release?.published_at ?? release?.created_at;
    if (dateString == null) return undefined;
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return undefined;
    return date.toISOString().split('T')[0];
}

function cleanReleaseBody(release: IGithubRelease) {
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
}

function releaseToMarkdown(release: IGithubRelease) {
    const dateHeading = formatReleaseDate(release) ?? release.tag_name ?? 'Nightly build';
    const body = cleanReleaseBody(release);
    return body.length > 0 ? `# ${dateHeading}\n\n${body}` : `# ${dateHeading}`;
}

function processReleases(allVersions: IGithubRelease[]): NightlyData {
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

    const computedChangelog = ordered.map(releaseToMarkdown).join('\n');

    return {
        latestVersion: latest,
        dmgBuild,
        exeBuild,
        debBuild,
        rpmBuild,
        winZip,
        macZip,
        linuxZip,
        releaseDate: formatReleaseDate(latest),
        computedChangelog,
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
            .then((releases) => setData(processReleases(releases)))
            .catch(() => setError(true));
    }, []);

    return { data, error };
}

function Page() {
    const { data, error } = useNightlyData();

    const latestVersion = data?.latestVersion;
    const dmgBuild = data?.dmgBuild;
    const exeBuild = data?.exeBuild;
    const debBuild = data?.debBuild;
    const rpmBuild = data?.rpmBuild;
    const winZip = data?.winZip;
    const macZip = data?.macZip;
    const linuxZip = data?.linuxZip;
    const releaseDate = data?.releaseDate;
    const computedChangelog = data?.computedChangelog ?? '';

    let currentBuild: IReleaseAsset | undefined;
    let zipBuild: IReleaseAsset | undefined;
    let icon: React.ComponentType;
    switch (OS.name) {
        case 'Windows':
            currentBuild = exeBuild;
            zipBuild = winZip;
            icon = BsWindows;
            break;
        case 'Mac OS':
            currentBuild = dmgBuild;
            zipBuild = macZip;
            icon = BsApple;
            break;
        case 'Debian':
            currentBuild = debBuild;
            zipBuild = linuxZip;
            icon = FaLinux;
            break;
        case 'RedHat':
            currentBuild = rpmBuild;
            zipBuild = linuxZip;
            icon = FaLinux;
            break;
        case 'Linux':
            currentBuild = debBuild;
            zipBuild = linuxZip;
            icon = FaLinux;
            break;
        default:
            icon = BsFillQuestionDiamondFill;
            break;
    }

    const isLoading = data === null && !error;

    return (
        <ShellWrapper>
            <VStack
                spacing={10}
                mb="auto"
                py={4}
            >
                <HStack w="full">
                    <Spacer display={{ base: 'block', sm: 'none' }} />
                    <Image
                        src={banner}
                        w={{
                            base: '240px',
                            md: '360px',
                        }}
                    />
                    <Spacer />
                    <HStack
                        spacing={{ base: 2, lg: 6 }}
                        display={{ base: 'none', sm: 'flex' }}
                    >
                        <GitHubButton />
                        <DiscordButton />
                        <KofiButton />
                    </HStack>
                </HStack>

                <Alert
                    status="warning"
                    borderRadius="xl"
                    w="full"
                    bg="rgba(245, 158, 11, 0.1)"
                    border="1px solid"
                    borderColor="rgba(245, 158, 11, 0.3)"
                    color="yellow.200"
                >
                    <AlertIcon color="yellow.400" />
                    <Text fontWeight="500">Nightly builds are experimental and may be unstable.</Text>
                </Alert>

                {error ? (
                    <Alert
                        status="error"
                        borderRadius="xl"
                        w="full"
                        bg="rgba(239, 68, 68, 0.1)"
                        border="1px solid"
                        borderColor="rgba(239, 68, 68, 0.3)"
                        color="red.200"
                    >
                        <AlertIcon color="red.400" />
                        <Text fontWeight="500">Failed to load nightly releases. Please try again later.</Text>
                    </Alert>
                ) : (
                    <>
                        <VStack
                            spacing={4}
                            mb={6}
                        >
                            <Button
                                bg="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
                                color="white"
                                borderRadius="2xl"
                                onClick={() => {
                                    if (currentBuild != null && isSupportedOS) {
                                        window.location.href = currentBuild?.browser_download_url;
                                    }
                                }}
                                height="auto"
                                px={10}
                                py={8}
                                disabled={isLoading || !isSupportedOS || currentBuild == null}
                                boxShadow="0 10px 25px -5px rgba(139, 92, 246, 0.4)"
                                transition="all 0.3s ease"
                                _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 20px 40px -5px rgba(139, 92, 246, 0.5)',
                                    bg: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                                }}
                                _active={{
                                    transform: 'translateY(0)',
                                }}
                                _disabled={{
                                    bg: 'gray.600',
                                    color: 'gray.400',
                                    cursor: 'not-allowed',
                                    _hover: {
                                        transform: 'none',
                                        boxShadow: 'none',
                                    },
                                }}
                            >
                                <VStack spacing={2}>
                                    <HStack spacing={3}>
                                        {isLoading ? (
                                            <Spinner size="lg" />
                                        ) : (
                                            <Icon
                                                boxSize={8}
                                                as={MdDownload}
                                            />
                                        )}
                                        <Text
                                            fontSize={{
                                                base: 20,
                                                sm: 26,
                                                md: 36,
                                            }}
                                            fontWeight="bold"
                                            letterSpacing="tight"
                                        >
                                            {isLoading
                                                ? 'Loading...'
                                                : latestVersion != null
                                                  ? `Download Nightly${releaseDate != null ? ` (${releaseDate})` : ''}`
                                                  : 'No nightly release found'}
                                        </Text>
                                    </HStack>
                                    {!isLoading && (
                                        <HStack spacing={2}>
                                            <Icon
                                                as={icon}
                                                boxSize={5}
                                            />
                                            <Text
                                                fontSize={18}
                                                fontWeight="500"
                                                opacity={0.9}
                                            >
                                                {isSupportedOS ? OS.name : 'Unsupported OS'}
                                            </Text>
                                        </HStack>
                                    )}
                                </VStack>
                            </Button>
                            <VStack spacing={2}>
                                {zipBuild != null && isSupportedOS && (
                                    <Text
                                        color="gray.300"
                                        fontSize="lg"
                                        textAlign="center"
                                    >
                                        Or download the{' '}
                                        <Link
                                            color="purple.400"
                                            href={zipBuild?.browser_download_url}
                                            fontWeight="600"
                                            textDecoration="underline"
                                            textDecorationColor="purple.400"
                                            textUnderlineOffset="3px"
                                            transition="all 0.2s ease"
                                            _hover={{
                                                color: 'purple.300',
                                                textDecorationColor: 'purple.300',
                                            }}
                                        >
                                            portable nightly (zip)
                                        </Link>
                                    </Text>
                                )}
                                <Text
                                    color="gray.300"
                                    fontSize="lg"
                                    textAlign="center"
                                >
                                    Prefer stability?{' '}
                                    <Link
                                        color="purple.400"
                                        href="/download"
                                        fontWeight="600"
                                        textDecoration="underline"
                                        textDecorationColor="purple.400"
                                        textUnderlineOffset="3px"
                                        transition="all 0.2s ease"
                                        _hover={{
                                            color: 'purple.300',
                                            textDecorationColor: 'purple.300',
                                        }}
                                    >
                                        Go to stable downloads
                                    </Link>
                                </Text>
                            </VStack>
                        </VStack>
                        <Box
                            color="white"
                            w="full"
                            bg="gray.800"
                            border="1px solid"
                            borderColor="rgba(255, 255, 255, 0.1)"
                            borderRadius="xl"
                            overflow="hidden"
                        >
                            <Box
                                bg="gray.900"
                                px={6}
                                py={4}
                                borderBottom="1px solid"
                                borderBottomColor="rgba(255, 255, 255, 0.1)"
                            >
                                <Text
                                    fontSize="lg"
                                    fontWeight="600"
                                    color="white"
                                >
                                    Nightly Release Notes
                                </Text>
                            </Box>
                            <Box
                                p={6}
                                h="49rem"
                                w="full"
                                overflowY="scroll"
                                css={{
                                    '&::-webkit-scrollbar': {
                                        width: '8px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: '4px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: 'rgba(139, 92, 246, 0.5)',
                                        borderRadius: '4px',
                                    },
                                    '&::-webkit-scrollbar-thumb:hover': {
                                        background: 'rgba(139, 92, 246, 0.7)',
                                    },
                                }}
                            >
                                {isLoading ? (
                                    <VStack
                                        h="full"
                                        justify="center"
                                    >
                                        <Spinner
                                            size="xl"
                                            color="purple.400"
                                        />
                                        <Text
                                            color="gray.400"
                                            mt={4}
                                        >
                                            Loading release notes...
                                        </Text>
                                    </VStack>
                                ) : (
                                    <ReactMarkdown
                                        components={ChakraUIRenderer()}
                                        skipHtml
                                    >
                                        {computedChangelog}
                                    </ReactMarkdown>
                                )}
                            </Box>
                        </Box>
                    </>
                )}
            </VStack>
        </ShellWrapper>
    );
}

export { Page };

export const documentProps = {
    title: 'chaiNNer Nightly Builds - Latest Development Releases',
    description: 'Download the latest nightly builds of chaiNNer with cutting-edge features and improvements. Experimental builds for Windows, macOS, and Linux with the newest image processing capabilities.',
    keywords: 'chaiNNer nightly, development builds, experimental features, beta version, latest updates',
    image: 'https://chainner.app/banner.png',
};
