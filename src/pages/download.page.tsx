/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';
import banner from '../assets/banner.png';
import '../App.scss';
import { Box, Button, HStack, Icon, Image, Link, Spacer, Text, VStack } from '@chakra-ui/react';
import { getRepoInfo } from '../api/api';
import { IGithubRelease, IReleaseAsset } from '../types/githubTypes';
import { isSupportedOS, OS } from '../utils';
import { BsWindows, BsApple, BsFillQuestionDiamondFill } from 'react-icons/bs/index.js';
import { FaLinux } from 'react-icons/fa/index.js';
import { MdDownload } from 'react-icons/md/index.js';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { GitHubButton } from '../components/GitHubButton';
import { DiscordButton } from '../components/DiscordButton';
import { KofiButton } from '../components/KofiButton';

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
    console.log('🚀 ~ file: download.page.tsx:33 ~ latestVersion', latestVersion);

    // const [data, setData] = useState<IGithubRelease>();
    // const [changeLog, setChangeLog] = useState('');
    const [stars, setStars] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            // const latestVersion = await getLatestVersion();
            // setData(latestVersion);
            // const allVersions = await getAllVersions();
            // const computedChangelog = allVersions.reduce((acc: string, curr: IGithubRelease) => {
            //     return `${acc}\n# ${curr.name}\n${curr.body}`;
            // }, '');
            const repoInfo = await getRepoInfo();
            setStars(repoInfo.stargazers_count);
            // setChangeLog(computedChangelog);
        })()
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                alert('Error occurred. Please try again later.');
            });
    }, []);

    // const dmgBuild = data?.assets.find((asset) => asset.name.endsWith('.dmg'));
    // const exeBuild = data?.assets.find((asset) => asset.name.endsWith('.exe'));
    // const debBuild = data?.assets.find((asset) => asset.name.endsWith('.deb'));
    // const rpmBuild = data?.assets.find((asset) => asset.name.endsWith('.rpm'));

    // const zipBuilds = data?.assets.filter((asset) => asset.name.endsWith('.zip'));
    // const winZip = zipBuilds?.find((asset) => asset.name.includes('win'));
    // const macZip = zipBuilds?.find((asset) => asset.name.includes('mac'));
    // const linuxZip = zipBuilds?.find((asset) => asset.name.includes('linux'));

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

    return isSupportedOS ? (
        <VStack spacing={8}>
            <HStack
                spacing={6}
                w="full"
            >
                <Image
                    src={banner}
                    w="360px"
                />
                <Spacer></Spacer>
                <GitHubButton stars={stars} />
                <DiscordButton />
                <KofiButton />
            </HStack>
            <VStack>
                <Button
                    colorScheme="green"
                    w={512}
                    h={32}
                    borderRadius="2xl"
                    isLoading={loading}
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
    ) : (
        <Text color="white">Sorry, chaiNNer is not supported by your current platform</Text>
    );
}

export { Page };
