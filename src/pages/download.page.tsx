/* eslint-disable @typescript-eslint/explicit-function-return-type */
import banner from '../assets/banner.png';
import '../index.scss';
import { Box, Button, HStack, Icon, Image, Link, Spacer, Text, VStack } from '@chakra-ui/react';
import { IGithubRelease, IReleaseAsset } from '../types/githubTypes';
import { OS } from '../utils';
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
    latestVersion: IGithubRelease;
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
                <HStack
                    spacing={6}
                    w="full"
                >
                    <Image
                        src={banner}
                        w="360px"
                    />
                    <Spacer></Spacer>
                    <GitHubButton />
                    <DiscordButton />
                    <KofiButton />
                </HStack>
                <VStack>
                    <Button
                        colorScheme="green"
                        w={512}
                        h={32}
                        borderRadius="2xl"
                        onClick={() => {
                            if (currentBuild != null) {
                                window.location.href = currentBuild?.browser_download_url;
                            }
                        }}
                    >
                        <VStack>
                            <HStack>
                                <Icon
                                    boxSize={8}
                                    as={MdDownload}
                                ></Icon>
                                <Text
                                    fontSize={36}
                                    fontWeight="bold"
                                >
                                    {latestVersion != null ? `Download ${latestVersion?.name}` : 'Loading...'}
                                </Text>
                            </HStack>
                            <HStack>
                                <Icon as={icon}></Icon>
                                <Text fontSize={18}>{OS.name}</Text>
                            </HStack>
                        </VStack>
                    </Button>
                    <Text color="white">
                        Or download the{' '}
                        <Link
                            color="blue.300"
                            href={zipBuild?.browser_download_url}
                        >
                            portable version (zip)
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
