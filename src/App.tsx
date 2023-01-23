import { useEffect, useState } from 'react';
import banner from './assets/banner.png';
import './App.scss';
import { Box, Button, Center, HStack, Icon, Image, Link, Spacer, Tag, Text, VStack } from '@chakra-ui/react';
import { getAllVersions, getLatestVersion, getRepoInfo } from './api/api';
import { IGithubRelease, IReleaseAsset } from './types/githubTypes';
import { isSupportedOS, OS } from './utils';
import { BsWindows, BsApple, BsFillQuestionDiamondFill, BsGithub, BsFillStarFill } from 'react-icons/bs/index.js';
import { FaLinux } from 'react-icons/fa/index.js';
import { SiKofi, SiDiscord } from 'react-icons/si/index.js';
import { MdDownload } from 'react-icons/md/index.js';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { Header } from './components/Header';
import { GitHubButton } from './components/GitHubButton';
import { DiscordButton } from './components/DiscordButton';
import { KofiButton } from './components/KofiButton';

function App(): JSX.Element {
    const [data, setData] = useState<IGithubRelease>();
    const [changeLog, setChangeLog] = useState('');
    const [stars, setStars] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const latestVersion = await getLatestVersion();
            setData(latestVersion);
            const allVersions = await getAllVersions();
            const computedChangelog = allVersions.reduce((acc: string, curr: IGithubRelease) => {
                return `${acc}\n# ${curr.name}\n${curr.body}`;
            }, '');
            const repoInfo = await getRepoInfo();
            setStars(repoInfo.stargazers_count);
            setChangeLog(computedChangelog);
        })()
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                alert('Error occurred. Please try again later.');
            });
    }, []);

    const dmgBuild = data?.assets.find((asset) => asset.name.endsWith('.dmg'));
    const exeBuild = data?.assets.find((asset) => asset.name.endsWith('.exe'));
    const debBuild = data?.assets.find((asset) => asset.name.endsWith('.deb'));
    const rpmBuild = data?.assets.find((asset) => asset.name.endsWith('.rpm'));

    const zipBuilds = data?.assets.filter((asset) => asset.name.endsWith('.zip'));
    const winZip = zipBuilds?.find((asset) => asset.name.includes('win'));
    const macZip = zipBuilds?.find((asset) => asset.name.includes('mac'));
    const linuxZip = zipBuilds?.find((asset) => asset.name.includes('linux'));

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
        <VStack
            w="full"
            h="full"
            spacing={0}
        >
            <Header />
            <Center
                h="100%"
                minH="100vh"
                w="full"
                p={2}
                className="background"
            >
                <Box
                    h="full"
                    w="1200px"
                    minW="1200px"
                    bgColor="gray.800"
                    p={6}
                    m={10}
                    borderRadius="2xl"
                >
                    {isSupportedOS ? (
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
                                                {data != null ? `Download ${data?.name}` : 'Loading...'}
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
                                h="100%"
                            >
                                <Box
                                    mx={2}
                                    p={4}
                                    h="full"
                                    w="full"
                                    // overflowY="scroll"
                                >
                                    <ReactMarkdown
                                        components={ChakraUIRenderer()}
                                        skipHtml
                                    >
                                        {changeLog}
                                    </ReactMarkdown>
                                </Box>
                            </Box>
                        </VStack>
                    ) : (
                        <Text color="white">Sorry, chaiNNer is not supported by your current platform</Text>
                    )}
                </Box>
            </Center>
        </VStack>
    );
}

export default App;
