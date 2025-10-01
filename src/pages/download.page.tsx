/* eslint-disable @typescript-eslint/explicit-function-return-type */
import banner from '../assets/banner.png';
import '../index.scss';
import { Box, Button, HStack, Icon, Image, Link, Spacer, Text, VStack } from '@chakra-ui/react';
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
    computedChangelog: string;
}) {
    const { latestVersion, dmgBuild, exeBuild, debBuild, rpmBuild, winZip, macZip, linuxZip, computedChangelog } = pageProps;

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
                <VStack>
                    <Button
                        bg="linear-gradient(135deg, #10b981 0%, #059669 100%)"
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
                        disabled={!isSupportedOS || currentBuild == null}
                        boxShadow="0 10px 25px -5px rgba(16, 185, 129, 0.4), 0 4px 6px -2px rgba(16, 185, 129, 0.1)"
                        transition="all 0.3s ease"
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: '0 20px 40px -5px rgba(16, 185, 129, 0.5), 0 8px 12px -2px rgba(16, 185, 129, 0.2)',
                            bg: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                            _before: {
                                left: '100%',
                            },
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
                        position="relative"
                        overflow="hidden"
                        _before={{
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                            transition: 'left 0.5s',
                        }}
                    >
                        <VStack spacing={2}>
                            <HStack spacing={3}>
                                <Icon
                                    boxSize={8}
                                    as={MdDownload}
                                />
                                <Text
                                    fontSize={{
                                        base: 20,
                                        sm: 26,
                                        md: 36,
                                    }}
                                    fontWeight="bold"
                                    letterSpacing="tight"
                                >
                                    {latestVersion != null ? `Download ${latestVersion?.name}` : 'No stable release found'}
                                </Text>
                            </HStack>
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
                        </VStack>
                    </Button>
                    {zipBuild != null && isSupportedOS && (
                        <Text
                            color="gray.300"
                            fontSize="lg"
                            textAlign="center"
                        >
                            Or download the{' '}
                            <Link
                                color="brand.400"
                                href={zipBuild?.browser_download_url}
                                fontWeight="600"
                                textDecoration="underline"
                                textDecorationColor="brand.400"
                                textUnderlineOffset="3px"
                                transition="all 0.2s ease"
                                _hover={{
                                    color: 'brand.300',
                                    textDecorationColor: 'brand.300',
                                }}
                            >
                                portable version (zip)
                            </Link>
                        </Text>
                    )}
                    <Text
                        color="gray.300"
                        fontSize="lg"
                        textAlign="center"
                    >
                        Want cutting-edge features?{' '}
                        <Link
                            color="brand.400"
                            href="/nightly"
                            fontWeight="600"
                            textDecoration="underline"
                            textDecorationColor="brand.400"
                            textUnderlineOffset="3px"
                            transition="all 0.2s ease"
                            _hover={{
                                color: 'brand.300',
                                textDecorationColor: 'brand.300',
                            }}
                        >
                            Try Nightly builds
                        </Link>
                    </Text>
                </VStack>
                <Box
                    color="white"
                    w="full"
                    bg="rgba(30, 41, 59, 0.6)"
                    backdropFilter="blur(10px)"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    borderRadius="xl"
                    boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
                    overflow="hidden"
                >
                    <Box
                        bg="rgba(15, 23, 42, 0.8)"
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
                            Release Notes
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
                                background: 'rgba(59, 130, 246, 0.5)',
                                borderRadius: '4px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: 'rgba(59, 130, 246, 0.7)',
                            },
                        }}
                    >
                        <ReactMarkdown
                            components={ChakraUIRenderer()}
                            skipHtml
                        >
                            {computedChangelog}
                        </ReactMarkdown>
                    </Box>
                </Box>
            </VStack>
        </ShellWrapper>
    );
}

export { Page };
