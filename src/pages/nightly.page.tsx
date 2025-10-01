/* eslint-disable @typescript-eslint/explicit-function-return-type */
import banner from '../assets/banner.png';
import '../index.scss';
import { Box, Button, HStack, Icon, Image, Link, Spacer, Text, VStack, Alert, AlertIcon } from '@chakra-ui/react';
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

function Page(pageProps: {
    latestVersion: IGithubRelease | undefined;
    dmgBuild: IReleaseAsset | undefined;
    exeBuild: IReleaseAsset | undefined;
    debBuild: IReleaseAsset | undefined;
    rpmBuild: IReleaseAsset | undefined;
    winZip: IReleaseAsset | undefined;
    macZip: IReleaseAsset | undefined;
    linuxZip: IReleaseAsset | undefined;
    previousReleases: IGithubRelease[];
}) {
    const { latestVersion, dmgBuild, exeBuild, debBuild, rpmBuild, winZip, macZip, linuxZip, previousReleases } = pageProps;
    const previous = previousReleases ?? [];
    const formatReleaseDate = (release?: IGithubRelease) => {
        const dateString = release?.published_at ?? release?.created_at;
        if (dateString == null) return undefined;
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return undefined;
        return date.toISOString().split('T')[0];
    };
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

    const releaseToMarkdown = (release: IGithubRelease) => {
        const dateHeading = formatReleaseDate(release) ?? release.tag_name ?? 'Nightly build';
        const body = cleanReleaseBody(release);
        return body.length > 0 ? `# ${dateHeading}\n\n${body}` : `# ${dateHeading}`;
    };
    const nightlyDateLabel = formatReleaseDate(latestVersion);

    let currentBuild: IReleaseAsset | undefined;
    let zipBuild: IReleaseAsset | undefined;
    let icon;
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

    return (
        <ShellWrapper>
            <VStack
                spacing={8}
                mb="auto"
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
                    borderRadius="md"
                    w="full"
                    bgColor="yellow.700"
                    color="white"
                >
                    <AlertIcon />
                    Nightly builds are experimental and may be unstable.
                </Alert>

                <VStack>
                    <Button
                        colorScheme="green"
                        borderRadius="2xl"
                        onClick={() => {
                            if (currentBuild != null && isSupportedOS) {
                                window.location.href = currentBuild?.browser_download_url;
                            }
                        }}
                        height="auto"
                        px={8}
                        py={7}
                        disabled={!isSupportedOS || currentBuild == null}
                    >
                        <VStack>
                            <HStack>
                                <Icon
                                    boxSize={8}
                                    as={MdDownload}
                                ></Icon>
                                <Text
                                    fontSize={{
                                        base: 20,
                                        sm: 26,
                                        md: 36,
                                    }}
                                    fontWeight="bold"
                                >
                                    {latestVersion != null
                                        ? `Download Nightly${nightlyDateLabel != null ? ` (${nightlyDateLabel})` : ''}`
                                        : 'No nightly release found'}
                                </Text>
                            </HStack>
                            <HStack>
                                <Icon as={icon}></Icon>
                                <Text fontSize={18}>{isSupportedOS ? OS.name : 'Unsupported OS'}</Text>
                            </HStack>
                        </VStack>
                    </Button>
                    {zipBuild != null && isSupportedOS && (
                        <Text color="white">
                            Or download the{' '}
                            <Link
                                color="blue.300"
                                href={zipBuild?.browser_download_url}
                            >
                                portable nightly (zip)
                            </Link>
                        </Text>
                    )}
                    <Text color="white">
                        Prefer stability?{' '}
                        <Link
                            color="blue.300"
                            href="/download"
                        >
                            Go to stable downloads
                        </Link>
                    </Text>
                </VStack>
                <Box
                    color="white"
                    w="full"
                    bgColor="gray.700"
                    borderRadius="lg"
                >
                    <Box
                        mx={2}
                        p={4}
                        h="49rem"
                        w="full"
                        overflowY="scroll"
                    >
                        {latestVersion != null ? (
                            <>
                                <Text
                                    fontWeight="bold"
                                    mb={2}
                                >
                                    Latest changes
                                </Text>
                                <ReactMarkdown
                                    components={ChakraUIRenderer()}
                                    skipHtml
                                >
                                    {releaseToMarkdown(latestVersion)}
                                </ReactMarkdown>
                                {previous.length > 0 && (
                                    <>
                                        <Box h={4} />
                                        <Text
                                            fontWeight="bold"
                                            mb={2}
                                        >
                                            Previous changes
                                        </Text>
                                        <VStack
                                            align="stretch"
                                            spacing={6}
                                        >
                                            {previous.map((release) => (
                                                <Box key={release.id}>
                                                    <ReactMarkdown
                                                        components={ChakraUIRenderer()}
                                                        skipHtml
                                                    >
                                                        {releaseToMarkdown(release)}
                                                    </ReactMarkdown>
                                                </Box>
                                            ))}
                                        </VStack>
                                    </>
                                )}
                            </>
                        ) : (
                            <Text>No changelog available.</Text>
                        )}
                    </Box>
                </Box>
            </VStack>
        </ShellWrapper>
    );
}

export { Page };
