/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Button, Container, Heading, HStack, Icon, Image, Link, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FaChevronDown } from 'react-icons/fa/index.js';
import '../index.scss';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { NodeFlow } from '../components/NodeFlow';
import { githubLink, templatesLink } from '../utils/links';

const SCREENSHOT_URL = 'https://github.com/chaiNNer-org/chaiNNer/raw/main/docs/assets/screenshot.png';

const STATS = [
    { label: 'Platforms', value: 'Windows · macOS · Linux' },
    { label: 'Frameworks', value: 'PyTorch · NCNN · ONNX · TensorRT' },
    { label: 'License', value: 'GPLv3' },
];

const USE_CASES = [
    {
        title: 'Upscaling',
        tag: 'most common',
        body: 'Load a model — ESRGAN, SPAN, OmniSR, Real-ESRGAN — and run it on your image, through PyTorch, NCNN, ONNX, or TensorRT depending on your hardware. Most of the models people use come from OpenModelDB.',
    },
    {
        title: 'Background removal',
        tag: null,
        body: 'u2net, isnet, and similar networks via ONNX. Feed it a photo, get a mask or a cutout.',
    },
    {
        title: 'Batch processing',
        tag: null,
        body: 'Point the Load Images or Load Video node at a folder and chaiNNer iterates over it. Combine with Save nodes to run whole directories through a chain, or call it from the CLI.',
    },
    {
        title: 'Color & adjustments',
        tag: null,
        body: 'Levels, curves, color balance, brightness/contrast, hue/saturation, sharpen, blur — each as a node you can slot in wherever you need it.',
    },
    {
        title: 'Resize, crop, rotate, blend',
        tag: null,
        body: 'Stack transforms, composite layers, pad images, and route different branches of the chain different ways.',
    },
    {
        title: 'Format conversion',
        tag: null,
        body: 'Read and write PNG, JPEG, WebP, and other common formats, as part of the same run that does the processing.',
    },
];

const STEPS = [
    {
        n: '1',
        title: 'Drag a node in.',
        body: 'Pick from the node list on the left, or right-click the canvas. There are hundreds — loaders, savers, processors, models, utilities.',
    },
    {
        n: '2',
        title: 'Connect the handles.',
        body: 'Every handle has a type and a color. chaiNNer only allows connections that make sense, and shows you which handles are compatible while you drag.',
    },
    {
        n: '3',
        title: 'Press run.',
        body: 'The connections light up as data flows through the chain. You can pause or stop at any time, and errors show up inline rather than after ten minutes of processing.',
    },
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
                    className="scroll-cue"
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

function UseCases() {
    return (
        <Section
            id="usecases"
            eyebrow="What you can do with it"
            heading="Upscaling is the common case. It isn't the only one."
        >
            <SimpleGrid
                columns={{ base: 1, sm: 2, lg: 3 }}
                spacing={4}
            >
                {USE_CASES.map((useCase) => (
                    <Card
                        key={useCase.title}
                        hoverAccent
                        p={5}
                    >
                        <HStack
                            align="start"
                            justify="space-between"
                            spacing={3}
                        >
                            <Heading
                                as="h3"
                                size="sm"
                                color="white"
                            >
                                {useCase.title}
                            </Heading>
                            {useCase.tag != null && (
                                <Text
                                    flexShrink={0}
                                    fontSize="10px"
                                    textTransform="uppercase"
                                    letterSpacing="0.1em"
                                    color="brand.200"
                                    bg="rgba(59, 130, 246, 0.12)"
                                    border="1px solid"
                                    borderColor="rgba(59, 130, 246, 0.35)"
                                    borderRadius="full"
                                    px={2}
                                    py={0.5}
                                >
                                    {useCase.tag}
                                </Text>
                            )}
                        </HStack>
                        <Text
                            mt={2}
                            fontSize="sm"
                            color="gray.400"
                            lineHeight="1.7"
                        >
                            {useCase.body}
                        </Text>
                    </Card>
                ))}
            </SimpleGrid>
        </Section>
    );
}

function HowItWorks() {
    return (
        <Section
            id="how"
            eyebrow="How it works"
            heading="Three steps."
        >
            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={12}
            >
                <VStack
                    align="start"
                    spacing={5}
                >
                    <Text
                        fontSize="md"
                        color="gray.400"
                        lineHeight="1.7"
                    >
                        The interface looks busy the first time you open it because there&apos;s a lot it can do, but the workflow is short. A three-node chain
                        — load image, upscale, save — is about the simplest thing you can build, and a twenty-node chain isn&apos;t much harder.
                    </Text>
                    <Link
                        isExternal
                        href={templatesLink}
                        color="brand.300"
                        fontSize="sm"
                        fontWeight="600"
                        _hover={{ color: 'brand.200' }}
                    >
                        Starter templates by Kim →
                    </Link>
                </VStack>

                <Box
                    as="ol"
                    listStyleType="none"
                    m={0}
                    p={0}
                >
                    {STEPS.map((step) => (
                        <Box
                            as="li"
                            key={step.n}
                            position="relative"
                            borderLeft="2px solid"
                            borderLeftColor="cable.500"
                            pl={7}
                            py={5}
                            _first={{ pt: 0 }}
                            _last={{ pb: 0, borderLeftColor: 'transparent' }}
                        >
                            <Box
                                position="absolute"
                                left="-13px"
                                top={{ base: '0', md: '1.25rem' }}
                                boxSize="24px"
                                borderRadius="full"
                                bg="brand.500"
                                color="white"
                                fontFamily="mono"
                                fontSize="xs"
                                fontWeight="700"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                boxShadow="0 0 0 4px rgba(59, 130, 246, 0.15)"
                            >
                                {step.n}
                            </Box>
                            <Heading
                                as="h3"
                                size="sm"
                                color="white"
                            >
                                {step.title}
                            </Heading>
                            <Text
                                mt={2}
                                fontSize="sm"
                                color="gray.400"
                                lineHeight="1.7"
                            >
                                {step.body}
                            </Text>
                        </Box>
                    ))}
                </Box>
            </SimpleGrid>
        </Section>
    );
}

function Page() {
    return (
        <Box w="100%">
            <Hero />
            <WhatItIs />
            <UseCases />
            <HowItWorks />
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
