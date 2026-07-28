/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/display-name */
import { Box, Button, Container, Flex, Grid, GridItem, Heading, HStack, Icon, Link, Spinner, Text, VStack } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import { BsApple, BsWindows } from 'react-icons/bs/index.js';
import { FaLinux } from 'react-icons/fa/index.js';
import ReactMarkdown from 'react-markdown';
import { OS } from '../utils';
import { formatFileSize, OS_TO_PLATFORM, PlatformBuild, preferredBuild, ReleaseNote } from '../utils/releases';
import ChakraUIRenderer from '../utils/chakra-ui-markdown-renderer';
import { releaseMarkdownTheme } from './releaseMarkdownTheme';

const PLATFORM_ICONS: Record<string, React.ComponentType> = {
    Windows: BsWindows,
    macOS: BsApple,
    Linux: FaLinux,
};

/**
 * The visitor's platform, resolved after mount. It is `undefined` on the server
 * and on the first client render, so the markup matches during hydration and
 * the page never blocks on user-agent detection.
 */
function useDetectedPlatform(): { platform: string; osName: string } | undefined {
    const [detected, setDetected] = useState<{ platform: string; osName: string }>();
    useEffect(() => {
        const osName = OS.name;
        const platform = osName == null ? undefined : OS_TO_PLATFORM[osName];
        if (osName != null && platform != null) setDetected({ platform, osName });
    }, []);
    return detected;
}

function BuildRow({ build }: { build: PlatformBuild }) {
    const size = formatFileSize(build.asset.size);
    return (
        <Grid
            as={Link}
            href={build.asset.browser_download_url}
            templateColumns={{ base: '1fr auto', sm: '7rem 1fr auto' }}
            columnGap={6}
            rowGap={1}
            alignItems="baseline"
            borderTop="1px solid"
            borderTopColor="line"
            py={3}
            transition="border-color 0.15s ease, background-color 0.15s ease"
            _hover={{ textDecoration: 'none', borderTopColor: 'brand.400', bg: 'whiteAlpha.50' }}
        >
            <GridItem
                display={{ base: 'none', sm: 'block' }}
                gridRow={{ sm: 1 }}
            >
                <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="ink"
                >
                    {build.platform}
                </Text>
            </GridItem>
            <GridItem minW={0}>
                <Text
                    fontSize="sm"
                    color="inkMuted"
                >
                    <Text
                        as="span"
                        display={{ base: 'inline', sm: 'none' }}
                        fontWeight="600"
                        color="ink"
                    >
                        {`${build.platform} `}
                    </Text>
                    {build.kind}
                    <Text
                        as="span"
                        fontFamily="mono"
                        fontSize="xs"
                        color="inkFaint"
                    >
                        {` ${build.format}`}
                    </Text>
                </Text>
            </GridItem>
            <GridItem justifySelf="end">
                <Text
                    fontFamily="mono"
                    fontSize="xs"
                    color="inkFaint"
                    whiteSpace="nowrap"
                >
                    {size}
                </Text>
            </GridItem>
        </Grid>
    );
}

function PrimaryDownload({ builds, accent }: { builds: PlatformBuild[]; accent: 'primary' | 'hairline' }) {
    const detected = useDetectedPlatform();
    const build = preferredBuild(builds, detected?.platform, detected?.osName);
    const icon = detected == null ? undefined : PLATFORM_ICONS[detected.platform];

    if (builds.length === 0) {
        return (
            <Text
                fontSize="sm"
                color="inkFaint"
            >
                No builds are attached to this release. The full list is on GitHub.
            </Text>
        );
    }

    return (
        <VStack
            align="start"
            spacing={3}
        >
            <Button
                as={Link}
                href={build?.asset.browser_download_url}
                variant={accent}
                size="lg"
                px={8}
                leftIcon={
                    icon == null ? undefined : (
                        <Icon
                            as={icon}
                            boxSize={5}
                        />
                    )
                }
                isDisabled={build == null}
                aria-describedby="primary-download-detail"
            >
                {detected == null ? 'Download' : `Download for ${detected.platform}`}
            </Button>
            <Text
                id="primary-download-detail"
                fontFamily="mono"
                fontSize="xs"
                color="inkFaint"
                minH="1rem"
                wordBreak="break-all"
            >
                {build == null
                    ? 'Pick your platform from the list below.'
                    : `${build.asset.name}${formatFileSize(build.asset.size) === '' ? '' : ` · ${formatFileSize(build.asset.size)}`}`}
            </Text>
        </VStack>
    );
}

/** A section on a release page: name on the left, substance on the right. */
function Block({ heading, children, first = false }: { heading: string; children: React.ReactNode; first?: boolean }) {
    return (
        <Box
            as="section"
            w="100%"
            py={{ base: 12, md: 16 }}
            borderTop={first ? undefined : '1px solid'}
            borderTopColor={first ? undefined : 'line'}
        >
            <Container maxW="1200px">
                <Grid
                    templateColumns={{ base: '1fr', lg: '15rem 1fr' }}
                    columnGap={16}
                    rowGap={{ base: 6, lg: 0 }}
                >
                    <GridItem>
                        <Heading
                            as={first ? 'h1' : 'h2'}
                            fontSize={{ base: '1.75rem', md: '2rem' }}
                            lineHeight="1.15"
                            position={{ lg: 'sticky' }}
                            top={{ lg: '7rem' }}
                        >
                            {heading}
                        </Heading>
                    </GridItem>
                    <GridItem minW={0}>{children}</GridItem>
                </Grid>
            </Container>
        </Box>
    );
}

export interface ReleasePageProps {
    /** Page title, e.g. `Download`. */
    title: string;
    /** One or two sentences under the title. */
    intro: React.ReactNode;
    /** Shown before the download, e.g. an experimental-builds warning. */
    notice?: React.ReactNode;
    /** Version or build label for the release being offered. */
    versionLabel: string | undefined;
    /** When that release was published. */
    versionDate: string | undefined;
    builds: PlatformBuild[];
    /** Heading for the notes block, e.g. `Release notes`. */
    notesHeading: string;
    notes: ReleaseNote[];
    /** Where to send people for the releases this page does not list. */
    archiveLabel: string;
    archiveHref: string;
    /** Link to the other flavour of build. */
    crossLink: { label: string; href: string };
    accent?: 'primary' | 'hairline';
    isLoading?: boolean;
    error?: React.ReactNode;
}

export const ReleasePage = memo(
    ({
        title,
        intro,
        notice,
        versionLabel,
        versionDate,
        builds,
        notesHeading,
        notes,
        archiveLabel,
        archiveHref,
        crossLink,
        accent = 'primary',
        isLoading = false,
        error,
    }: ReleasePageProps) => {
        return (
            <Box w="100%">
                <Block
                    first
                    heading={title}
                >
                    <VStack
                        align="stretch"
                        spacing={8}
                        maxW="42rem"
                    >
                        <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            color="inkMuted"
                            lineHeight="1.7"
                        >
                            {intro}
                        </Text>

                        {notice}

                        {error != null ? (
                            error
                        ) : isLoading ? (
                            <HStack
                                spacing={3}
                                color="inkFaint"
                            >
                                <Spinner size="sm" />
                                <Text fontSize="sm">Loading builds…</Text>
                            </HStack>
                        ) : (
                            <>
                                <Flex
                                    gap={3}
                                    align="baseline"
                                    flexWrap="wrap"
                                >
                                    <Text
                                        fontFamily="mono"
                                        fontSize="sm"
                                        color="ink"
                                    >
                                        {versionLabel ?? 'No release found'}
                                    </Text>
                                    {versionDate != null && (
                                        <Text
                                            fontFamily="mono"
                                            fontSize="xs"
                                            color="inkFaint"
                                        >
                                            {versionDate}
                                        </Text>
                                    )}
                                </Flex>

                                <PrimaryDownload
                                    accent={accent}
                                    builds={builds}
                                />

                                {builds.length > 0 && (
                                    <Box>
                                        <Text
                                            fontSize="sm"
                                            fontWeight="600"
                                            color="ink"
                                            mb={1}
                                        >
                                            All platforms
                                        </Text>
                                        <Box>
                                            {builds.map((build) => (
                                                <BuildRow
                                                    key={build.asset.id}
                                                    build={build}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                )}

                                <Link
                                    href={crossLink.href}
                                    fontSize="sm"
                                    fontWeight="600"
                                    color="brand.300"
                                    _hover={{ color: 'brand.200' }}
                                >
                                    {`${crossLink.label} →`}
                                </Link>
                            </>
                        )}
                    </VStack>
                </Block>

                {notes.length > 0 && (
                    <Block heading={notesHeading}>
                        <Box maxW="36rem">
                            {notes.map((note) => (
                                <Box
                                    as="article"
                                    key={note.href}
                                    borderTop="1px solid"
                                    borderTopColor="line"
                                    pt={5}
                                    pb={8}
                                    sx={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 20rem' }}
                                >
                                    <Flex
                                        gap={3}
                                        align="baseline"
                                        flexWrap="wrap"
                                        mb={4}
                                    >
                                        <Heading
                                            as="h3"
                                            fontSize="lg"
                                        >
                                            <Link
                                                isExternal
                                                href={note.href}
                                                _hover={{ color: 'brand.300', textDecoration: 'none' }}
                                            >
                                                {note.title}
                                            </Link>
                                        </Heading>
                                        {note.date != null && (
                                            <Text
                                                fontFamily="mono"
                                                fontSize="xs"
                                                color="inkFaint"
                                            >
                                                {note.date}
                                            </Text>
                                        )}
                                    </Flex>
                                    <Box
                                        fontSize="md"
                                        color="inkMuted"
                                        lineHeight="1.7"
                                    >
                                        <ReactMarkdown
                                            components={ChakraUIRenderer(releaseMarkdownTheme)}
                                            skipHtml
                                        >
                                            {note.body}
                                        </ReactMarkdown>
                                    </Box>
                                </Box>
                            ))}

                            <Link
                                isExternal
                                href={archiveHref}
                                display="inline-block"
                                borderTop="1px solid"
                                borderTopColor="line"
                                w="100%"
                                pt={6}
                                fontSize="sm"
                                fontWeight="600"
                                color="brand.300"
                                _hover={{ color: 'brand.200' }}
                            >
                                {`${archiveLabel} →`}
                            </Link>
                        </Box>
                    </Block>
                )}
            </Box>
        );
    }
);
