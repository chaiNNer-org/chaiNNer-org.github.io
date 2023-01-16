import { useEffect, useState } from 'react';
import banner from '../public/banner.png';
import './App.css';
import { Box, Button, Center, HStack, Image, Link, Text, VStack } from '@chakra-ui/react';
import { getLatestVersion } from './api/api';
import { IGithubRelease, IReleaseAsset } from './types/githubTypes';
import { fileExtensionMap, isSupportedOS, OS } from './utils';

function App(): JSX.Element {
    const [data, setData] = useState<IGithubRelease>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLatestVersion()
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch(() => {
                alert('Error occurred. Please try again later.');
                setLoading(false);
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
    switch (OS.name) {
        case 'Windows':
            currentBuild = exeBuild;
            zipBuild = winZip;
            break;
        case 'Mac OS':
            currentBuild = dmgBuild;
            zipBuild = macZip;
            break;
        case 'Debian':
            currentBuild = debBuild;
            zipBuild = linuxZip;
            break;
        case 'RedHat':
            currentBuild = rpmBuild;
            zipBuild = linuxZip;
            break;
        case 'Linux':
            currentBuild = debBuild;
            zipBuild = linuxZip;
            break;
        default:
            break;
    }

    return (
        <Center
            h="100vh"
            w="100vw"
            bgColor="gray.900"
            p={10}
        >
            <Box
                h="full"
                w="1500px"
                bgColor="gray.800"
                p={10}
                m={10}
                borderRadius="lg"
            >
                {isSupportedOS ? (
                    <VStack>
                        <HStack
                            spacing={16}
                            w="full"
                        >
                            <Image
                                src={banner}
                                w="512px"
                            />
                            <Button colorScheme="blue">Home</Button>
                            <Button colorScheme="blue">Docs</Button>
                            <Button colorScheme="blue">About</Button>
                        </HStack>
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
                                <Text
                                    fontSize={36}
                                    fontWeight="bold"
                                >
                                    {data != null ? `Download ${data?.name}` : 'Loading...'}
                                </Text>
                                <Text fontSize={18}>{OS.name}</Text>
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
                ) : (
                    <Text>Sorry, chaiNNer is not supported by your current platform</Text>
                )}
            </Box>
        </Center>
    );
}

export default App;
