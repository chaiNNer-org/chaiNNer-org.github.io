/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Button, Container, Heading, HStack, Icon, Image, Link, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FaChevronDown } from 'react-icons/fa/index.js';
import '../index.scss';
import { Section } from '../components/Section';
import { NodeFlow } from '../components/NodeFlow';
import { githubLink } from '../utils/links';

const SCREENSHOT_URL = 'https://github.com/chaiNNer-org/chaiNNer/raw/main/docs/assets/screenshot.png';

const STATS = [
    { label: 'Platforms', value: 'Windows · macOS · Linux' },
    { label: 'Frameworks', value: 'PyTorch · NCNN · ONNX · TensorRT' },
    { label: 'License', value: 'GPLv3' },
];

function Hero() {
    return (
        <Box
            as="section"
            position="relative"
            w="100%"
            minH="calc(100vh - 4.5rem)"
            display="flex"
            alignItems="center"
            overflow="hidden"
        >
            <Box
                position="absolute"
                inset={0}
                zIndex={0}
            >
                <Image
                    className="hero-screenshot"
                    src={SCREENSHOT_URL}
                    alt="The chaiNNer node editor with an image processing chain on the canvas"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    opacity={0.7}
                />
                <Box
                    position="absolute"
                    inset={0}
                    bgImage="radial-gradient(circle at 74% 26%, rgba(59, 130, 246, 0.22), transparent 40%), linear-gradient(90deg, var(--chakra-colors-gray-900) 0%, rgba(26, 32, 44, 0.88) 46%, rgba(26, 32, 44, 0.4) 100%)"
                />
                <Box
                    position="absolute"
                    insetX={0}
                    bottom={0}
                    h="14rem"
                    bgGradient="linear(to-t, gray.900, transparent)"
                />
            </Box>

            <Container
                maxW="1200px"
                position="relative"
                zIndex={1}
                py={{ base: 24, md: 32 }}
            >
                <VStack
                    className="hero-copy"
                    align="start"
                    spacing={0}
                    maxW="46rem"
                >
                    <Text
                        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                        style={{ '--delay': '120ms' } as React.CSSProperties}
                        fontFamily="mono"
                        fontSize="xs"
                        textTransform="uppercase"
                        letterSpacing="0.2em"
                        color="brand.300"
                    >
                        Node-based image processing
                    </Text>
                    <Heading
                        as="h1"
                        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                        style={{ '--delay': '220ms' } as React.CSSProperties}
                        fontSize={{ base: '4rem', md: '6rem' }}
                        lineHeight="1"
                        letterSpacing="-0.04em"
                        color="white"
                        mt={5}
                    >
                        chaiNNer
                    </Heading>
                    <Text
                        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                        style={{ '--delay': '340ms' } as React.CSSProperties}
                        fontSize={{ base: 'xl', md: '2xl' }}
                        fontWeight="600"
                        color="white"
                        mt={5}
                    >
                        A node-based editor for image processing pipelines.
                    </Text>
                    <Text
                        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                        style={{ '--delay': '460ms' } as React.CSSProperties}
                        fontSize="lg"
                        color="gray.300"
                        lineHeight="1.7"
                        maxW="36rem"
                        mt={4}
                    >
                        Drag nodes onto a canvas, connect them, hit run. Free and open source, for Windows, macOS, and Linux.
                    </Text>

                    <HStack
                        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                        style={{ '--delay': '580ms' } as React.CSSProperties}
                        spacing={4}
                        mt={10}
                        flexWrap="wrap"
                    >
                        <Button
                            as={Link}
                            href="/download"
                            bg="brand.500"
                            color="white"
                            size="lg"
                            px={8}
                            borderRadius="lg"
                            fontWeight="600"
                            boxShadow="0 4px 12px -2px rgba(59, 130, 246, 0.35)"
                            transition="all 0.2s ease"
                            _hover={{ bg: 'brand.400', transform: 'translateY(-2px)', textDecoration: 'none' }}
                            _active={{ transform: 'translateY(0)' }}
                        >
                            Download
                        </Button>
                        <Button
                            as={Link}
                            isExternal
                            href={githubLink}
                            bg="transparent"
                            color="white"
                            border="1px solid"
                            borderColor="whiteAlpha.400"
                            size="lg"
                            px={8}
                            borderRadius="lg"
                            fontWeight="600"
                            transition="all 0.2s ease"
                            _hover={{ borderColor: 'brand.400', bg: 'whiteAlpha.100', transform: 'translateY(-2px)', textDecoration: 'none' }}
                            _active={{ transform: 'translateY(0)' }}
                        >
                            View on GitHub
                        </Button>
                    </HStack>

                    <SimpleGrid
                        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                        style={{ '--delay': '700ms' } as React.CSSProperties}
                        columns={{ base: 1, sm: 3 }}
                        spacing={6}
                        mt={12}
                        w="100%"
                        maxW="36rem"
                    >
                        {STATS.map((stat) => (
                            <VStack
                                key={stat.label}
                                align="start"
                                spacing={1}
                            >
                                <Text
                                    fontSize="xs"
                                    textTransform="uppercase"
                                    letterSpacing="0.12em"
                                    color="gray.500"
                                >
                                    {stat.label}
                                </Text>
                                <Text
                                    fontFamily="mono"
                                    fontSize="sm"
                                    color="gray.200"
                                >
                                    {stat.value}
                                </Text>
                            </VStack>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Container>

            <VStack
                position="absolute"
                bottom={8}
                left="50%"
                transform="translateX(-50%)"
                spacing={2}
                zIndex={1}
                display={{ base: 'none', md: 'flex' }}
            >
                <Text
                    color="gray.400"
                    fontSize="sm"
                >
                    Scroll to learn more
                </Text>
                <Icon
                    as={FaChevronDown}
                    color="gray.400"
                    boxSize={5}
                    sx={{
                        '@keyframes bounce': {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(8px)' },
                        },
                        animation: 'bounce 2s ease-in-out infinite',
                    }}
                />
            </VStack>
        </Box>
    );
}

function WhatItIs() {
    return (
        <Section
            id="what"
            divider={false}
            eyebrow="What it is"
            heading="A canvas, some nodes, and wires between them."
            lede={
                <VStack
                    align="start"
                    spacing={5}
                >
                    <Text
                        fontSize="lg"
                        color="gray.300"
                        lineHeight="1.7"
                    >
                        chaiNNer is a desktop GUI for building image processing pipelines. Instead of writing scripts or clicking through menus, you drop nodes
                        onto a canvas and connect them. Each node does one thing — load an image, upscale it, resize it, remove the background, save it — and
                        you combine them however you want.
                    </Text>
                    <Text
                        fontSize="lg"
                        color="gray.300"
                        lineHeight="1.7"
                    >
                        It was originally written for AI upscaling, and that&apos;s still what most people open it for. There&apos;s a large library of
                        community-trained super-resolution models, and chaiNNer runs them through PyTorch, NCNN, ONNX, or TensorRT. It has since grown into a
                        general-purpose image processing editor: color work, blending, format conversion, batch processing, and video frames.
                    </Text>
                    <Text
                        fontSize="md"
                        color="gray.400"
                        lineHeight="1.7"
                    >
                        Cross-platform (Windows, macOS, Linux), self-contained (no Python install required), GPLv3.
                    </Text>
                </VStack>
            }
        >
            <NodeFlow />
        </Section>
    );
}

function Page() {
    return (
        <Box w="100%">
            <Hero />
            <WhatItIs />
        </Box>
    );
}

export { Page };

export const documentProps = {
    title: 'chaiNNer - Node-Based Image Processing',
    description:
        'chaiNNer is a node-based editor for image processing pipelines. Drag nodes onto a canvas, connect them, and run them. Free and open source for Windows, macOS, and Linux.',
    keywords: 'chaiNNer, image processing, node editor, batch processing, AI upscaling, GPU acceleration, Windows, macOS, Linux',
    image: 'https://chainner.app/banner.png',
};
