/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Button, Container, Flex, Grid, GridItem, Heading, HStack, Icon, Image, Link, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { BsStarFill } from 'react-icons/bs/index.js';
import '../index.scss';
import { Prose, Section } from '../components/Section';
import { discordLink, githubLink, kofiLink, openModelDbLink, spandrelLink, templatesLink } from '../utils/links';
import Screenshot from '../assets/screenshot.png';

/** A link sitting inside a sentence rather than standing on its own. */
function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            isExternal
            href={href}
            color="brand.300"
            textUnderlineOffset="2px"
            _hover={{ color: 'brand.200' }}
        >
            {children}
        </Link>
    );
}

const USE_CASES: Array<{ title: string; body: React.ReactNode }> = [
    {
        title: 'Upscaling',
        body: (
            <>
                Load a super-resolution model and run it on your image. ESRGAN, SPAN, OmniSR, and Real-ESRGAN are the familiar names, and{' '}
                <InlineLink href={spandrelLink}>Spandrel</InlineLink>, the architecture-support package chaiNNer maintains, handles dozens more. Most of the
                models people use come from <InlineLink href={openModelDbLink}>OpenModelDB</InlineLink>.
            </>
        ),
    },
    {
        title: 'Face restoration',
        body: 'Upscale Face finds the faces in an image, restores each one with a dedicated face model — GFPGAN, RestoreFormer, or CodeFormer — and pastes them back in. Hand it your general upscale as the background so the face model only has to deal with the faces.',
    },
    {
        title: 'Color correction after an upscale',
        body: 'Upscaling models drift the color of their output. Average Color Fix and Wavelet Color Fix match the result back to the original, and Color Transfer moves the look of one image onto another. Wavelet usually looks better and costs more time.',
    },
    {
        title: 'Model interpolation',
        body: 'Interpolate Models blends two models into a new one you can run or save to disk, so you can make your own without training anything. The two have to share a pretrained ancestor — chaiNNer test-blends them and refuses the pair if the result comes out degenerate.',
    },
    {
        title: 'Textures and normal maps',
        body: 'Normal Map Generator builds a normal map from a diffuse texture. Add Normals, Scale Normals, and Balance Normals combine and correct them, and Metal to Specular converts between PBR workflows.',
    },
    {
        title: 'Shipping game textures',
        body: 'Save Image writes DDS with BC1 through BC7, sRGB or linear, and mipmaps, including the two-channel BC5 formats that pair with the normal map nodes. Split Spritesheet takes a sheet apart, the chain runs on every tile, and Merge Spritesheet puts it back together.',
    },
    {
        title: 'Pixel art',
        body: 'Resize Pixel Art upscales with HQ2x, Eagle, and AdvMAME instead of a model. Palette from Image extracts a palette that Apply Palette and Dither (Palette) consume, and Quantize to Reference re-quantizes an upscale using colors sampled locally from the original rather than globally.',
    },
    {
        title: 'Batch processing',
        body: 'Point Load Images at a folder or Load Video at a clip, and the chain runs over every image or frame. Save Image collects the results at the other end, and Save Video re-encodes frames back into a file as H.264, H.265, VP9, or lossless FFV1. Text Pattern and Regex Replace build output filenames out of the input names.',
    },
    {
        title: 'Color and adjustments',
        body: 'Color Levels, Brightness & Contrast, Hue & Saturation, and Gamma cover the usual corrections, with Stretch Contrast for automatic levels. Unsharp Mask and High Boost Filter sharpen, while Gaussian, box, median, surface, and lens blur soften. Add, Multiply, and Divide scale every channel by a value, and Threshold cuts an image to black and white.',
    },
    {
        title: 'Resize, crop, rotate, blend',
        body: 'Resize by ratio or to a target side length, crop to the visible content or strip a flat border automatically, then Pad, Rotate, and Flip. Blend Images lays an overlay onto a base with the usual modes — normal, multiply, screen, overlay — Stack Images concatenates several horizontally or vertically, and Get Dimensions reads height, width, and channel count back out for later nodes to use.',
    },
];

const STEPS = [
    {
        title: 'Drag a node in',
        body: 'Pick one from the node list on the left, or right-click the canvas. There are hundreds: loaders, savers, processors, models, utilities.',
    },
    {
        title: 'Connect the handles',
        body: 'Every handle has a type and a color. chaiNNer only allows connections that make sense, and shows you which handles are compatible while you drag.',
    },
    {
        title: 'Press run',
        body: 'The connections light up as data moves through the chain. You can pause or stop at any time, and errors appear on the node that caused them instead of after ten minutes of processing.',
    },
];

const FRAMEWORKS = [
    { name: 'PyTorch', note: 'CUDA on Nvidia, ROCm on Linux AMD, MPS on Apple Silicon.' },
    { name: 'NCNN', note: 'AMD, Intel, Nvidia, and Apple. Covers hardware PyTorch does not.' },
    { name: 'ONNX', note: 'Broad model support, including background removal networks.' },
    { name: 'TensorRT', note: 'Fastest on Nvidia, once the model has been converted.' },
];

const SPECS = [
    {
        term: 'Python',
        body: 'On first launch chaiNNer downloads an isolated Python build into its own folder and manages dependencies through a built-in Dependency Manager. You can point it at a system Python instead if you prefer.',
    },
    {
        term: 'Command line',
        body: 'Saved chains can be run from the command line, so chaiNNer can be one step inside a larger pipeline.',
    },
    {
        term: 'Type checking',
        body: 'Every node input has a type. The editor validates the chain as you build it and refuses connections that would fail at run time.',
    },
];

const ELSEWHERE = [
    { title: 'GitHub', sub: 'Source, issues, pull requests', href: githubLink },
    { title: 'Discord', sub: 'Chains, models, and help', href: discordLink },
    { title: 'OpenModelDB', sub: 'Community-trained models', href: openModelDbLink },
    { title: 'Ko-fi', sub: 'Optional tips', href: kofiLink },
];

const CANVAS = '26, 32, 44';

/** `12143` reads as `12.1k`, the way GitHub itself writes it. */
function formatStars(count: number): string {
    return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(count).toLowerCase();
}

function Hero({ stars }: { stars: number | undefined }) {
    return (
        <Box
            as="section"
            position="relative"
            w="100%"
            // Deliberately short of a full viewport so the first section is
            // visible under the fold and the page reads as continuous.
            minH={{ base: 'auto', md: 'min(46rem, calc(100vh - 11rem))' }}
            display="flex"
            alignItems="center"
            overflow="hidden"
        >
            {/*
             * The editor at full strength, not dimmed into wallpaper. The scrim
             * clears the copy on the left and lets the graph read on the right,
             * so the first thing you see is the actual product. The whole layer
             * is masked out at the bottom rather than covered, so the dot canvas
             * underneath surfaces and the hero has no seam.
             */}
            <Box
                position="absolute"
                inset={0}
                zIndex={0}
                sx={{
                    maskImage: 'linear-gradient(to bottom, #000 0%, #000 58%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 58%, transparent 100%)',
                }}
            >
                <Image
                    src={Screenshot}
                    alt="The chaiNNer node editor: a chain of load, upscale, merge, and preview nodes wired together on the canvas"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    objectPosition="70% center"
                />
                {/*
                 * Narrow screens have no room to hold copy and graph side by
                 * side, so the scrim goes flat and the editor drops back to
                 * texture. Wide screens keep the graph legible beside the copy.
                 */}
                <Box
                    position="absolute"
                    inset={0}
                    bgImage={{
                        base: `linear-gradient(180deg, rgba(${CANVAS}, 0.9) 0%, rgba(${CANVAS}, 0.85) 60%, rgb(${CANVAS}) 100%)`,
                        md: `linear-gradient(100deg, rgb(${CANVAS}) 0%, rgb(${CANVAS}) 32%, rgba(${CANVAS}, 0.93) 48%, rgba(${CANVAS}, 0.55) 68%, rgba(${CANVAS}, 0.18) 86%, rgba(${CANVAS}, 0.06) 100%)`,
                    }}
                />
            </Box>

            <Container
                maxW="1200px"
                position="relative"
                zIndex={1}
                py={{ base: 20, md: 28 }}
            >
                <Box maxW="40rem">
                    <Heading
                        as="h1"
                        fontSize={{ base: '3.5rem', sm: '4.5rem', md: '5.5rem' }}
                        lineHeight="0.95"
                        letterSpacing="-0.035em"
                    >
                        chaiNNer
                    </Heading>
                    <Text
                        fontSize={{ base: 'xl', md: '2xl' }}
                        fontWeight="500"
                        color="ink"
                        lineHeight="1.35"
                        mt={6}
                    >
                        A node-based editor for image processing pipelines.
                    </Text>
                    <Text
                        fontSize={{ base: 'md', md: 'lg' }}
                        color="inkMuted"
                        lineHeight="1.7"
                        maxW="32rem"
                        mt={4}
                    >
                        Drag nodes onto a canvas, connect them, and press run. Free and open source, for Windows, macOS, and Linux.
                    </Text>

                    <Flex
                        gap={3}
                        mt={10}
                        flexWrap="wrap"
                    >
                        <Button
                            as={Link}
                            href="/download"
                            variant="primary"
                            size="lg"
                            px={8}
                        >
                            Download
                        </Button>
                        <Button
                            as={Link}
                            isExternal
                            href={githubLink}
                            variant="hairline"
                            size="lg"
                            px={8}
                        >
                            View on GitHub
                            {stars != null && (
                                <>
                                    <Box
                                        aria-hidden
                                        w="1px"
                                        h="1.35rem"
                                        mx={5}
                                        bg="lineStrong"
                                    />
                                    <Icon
                                        as={BsStarFill}
                                        boxSize={3}
                                        mr={2}
                                        color="inkFaint"
                                    />
                                    <Text
                                        as="span"
                                        fontFamily="mono"
                                        fontSize="sm"
                                        fontWeight="500"
                                        color="inkMuted"
                                    >
                                        {formatStars(stars)}
                                    </Text>
                                </>
                            )}
                        </Button>
                    </Flex>
                </Box>
            </Container>
        </Box>
    );
}

function WhatItIs() {
    return (
        <Section
            id="what"
            divider={false}
            heading="What it is"
        >
            <Prose>
                <p>
                    chaiNNer is a desktop editor for building image processing pipelines. Instead of writing scripts or clicking through menus, you drop nodes
                    onto a canvas and connect them. Each node does one thing: load an image, upscale it, resize it, remove the background, save it. You decide
                    how they combine.
                </p>
                <p>
                    It was originally written for AI upscaling, and that is still what most people install it for. There is a large library of community-trained
                    super-resolution models, and chaiNNer runs them through PyTorch, NCNN, ONNX, or TensorRT. It has since grown into a general-purpose image
                    editor: color work, blending, format conversion, batch runs, and video frames.
                </p>
            </Prose>
        </Section>
    );
}

function UseCases() {
    return (
        <Section
            id="usecases"
            heading="What you can do with it"
        >
            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                columnGap={10}
                rowGap={0}
            >
                {USE_CASES.map((useCase) => (
                    <Box
                        key={useCase.title}
                        borderTop="1px solid"
                        borderTopColor="line"
                        py={5}
                    >
                        <Heading
                            as="h3"
                            fontSize="md"
                        >
                            {useCase.title}
                        </Heading>
                        <Text
                            mt={2}
                            fontSize="sm"
                            color="inkFaint"
                            lineHeight="1.65"
                        >
                            {useCase.body}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Section>
    );
}

function HowItWorks() {
    return (
        <Section
            id="how"
            heading="How it works"
        >
            <Prose>
                <p>
                    The interface looks busy the first time you open it, because there is a lot it can do. The workflow is short, though. A three-node chain —
                    load image, upscale, save — is about the simplest thing you can build, and a twenty-node chain is not much harder.
                </p>
            </Prose>

            <Box
                className="chain"
                as="ol"
                listStyleType="none"
                mt={12}
                mb={0}
                p={0}
                maxW="40rem"
            >
                {STEPS.map((step, i) => (
                    <Box
                        className="chain-step"
                        as="li"
                        key={step.title}
                        pl={9}
                        pb={i === STEPS.length - 1 ? 0 : 9}
                    >
                        <Box
                            className="chain-port"
                            aria-hidden
                        />
                        <HStack
                            align="baseline"
                            spacing={3}
                        >
                            <Text
                                fontFamily="mono"
                                fontSize="xs"
                                color="cable.400"
                            >
                                {i + 1}
                            </Text>
                            <Heading
                                as="h3"
                                fontSize="md"
                            >
                                {step.title}
                            </Heading>
                        </HStack>
                        <Text
                            mt={2}
                            fontSize="sm"
                            color="inkFaint"
                            lineHeight="1.65"
                        >
                            {step.body}
                        </Text>
                    </Box>
                ))}
            </Box>

            <Link
                isExternal
                href={templatesLink}
                display="inline-block"
                mt={10}
                fontSize="sm"
                fontWeight="600"
                color="brand.300"
                _hover={{ color: 'brand.200' }}
            >
                Upscaling templates by Kim2091 →
            </Link>
        </Section>
    );
}

function SpecRow({ term, children }: { term: string; children: React.ReactNode }) {
    return (
        <Grid
            templateColumns={{ base: '1fr', sm: '9rem 1fr' }}
            columnGap={8}
            rowGap={2}
            borderTop="1px solid"
            borderTopColor="line"
            py={5}
        >
            <GridItem>
                <Text
                    as="dt"
                    fontSize="sm"
                    fontWeight="600"
                    color="ink"
                >
                    {term}
                </Text>
            </GridItem>
            <GridItem
                as="dd"
                minW={0}
            >
                {children}
            </GridItem>
        </Grid>
    );
}

function UnderTheHood() {
    return (
        <Section heading="Under the hood">
            <Box
                as="dl"
                m={0}
                maxW="46rem"
            >
                <SpecRow term="GPU frameworks">
                    <VStack
                        align="start"
                        spacing={2}
                    >
                        {FRAMEWORKS.map((framework) => (
                            <Text
                                key={framework.name}
                                fontSize="sm"
                                color="inkFaint"
                                lineHeight="1.6"
                            >
                                <Text
                                    as="span"
                                    fontFamily="mono"
                                    color="ink"
                                >
                                    {framework.name}
                                </Text>
                                {`: ${framework.note}`}
                            </Text>
                        ))}
                        <Text
                            fontSize="sm"
                            color="inkFaint"
                            pt={1}
                        >
                            All of them fall back to the CPU.
                        </Text>
                    </VStack>
                </SpecRow>
                {SPECS.map((spec) => (
                    <SpecRow
                        key={spec.term}
                        term={spec.term}
                    >
                        <Text
                            fontSize="sm"
                            color="inkFaint"
                            lineHeight="1.65"
                        >
                            {spec.body}
                        </Text>
                    </SpecRow>
                ))}
            </Box>
        </Section>
    );
}

function OpenSource() {
    return (
        <Section heading="Open source">
            <Prose>
                <p>
                    chaiNNer is a hobby project under the GPLv3 license. There is a small group of maintainers, a number of contributors, and a Discord where
                    people share chains and models. Bug reports go in GitHub issues, and if you know TypeScript, React, or Python, pull requests are welcome.
                </p>
                <p>There is a Ko-fi if you want to support the project. Nothing is gated behind it.</p>
            </Prose>

            <SimpleGrid
                columns={{ base: 1, sm: 2, lg: 4 }}
                columnGap={8}
                rowGap={0}
                mt={12}
            >
                {ELSEWHERE.map((item) => (
                    <Link
                        key={item.title}
                        isExternal
                        href={item.href}
                        display="block"
                        borderTop="1px solid"
                        borderTopColor="line"
                        pt={4}
                        pb={4}
                        transition="border-color 0.15s ease"
                        _hover={{ textDecoration: 'none', borderTopColor: 'brand.400', '& .elsewhere-title': { color: 'brand.300' } }}
                    >
                        <Text
                            className="elsewhere-title"
                            fontSize="sm"
                            fontWeight="600"
                            color="ink"
                            transition="color 0.15s ease"
                        >
                            {item.title}
                        </Text>
                        <Text
                            fontSize="xs"
                            color="inkFaint"
                            mt={1}
                        >
                            {item.sub}
                        </Text>
                    </Link>
                ))}
            </SimpleGrid>
        </Section>
    );
}

function GetIt() {
    return (
        <Box
            as="section"
            w="100%"
            borderTop="1px solid"
            borderTopColor="line"
            // The dot grid stops here. The page ends on solid ground.
            bg="canvas"
            py={{ base: 14, md: 20 }}
        >
            <Container maxW="1200px">
                <Grid
                    templateColumns={{ base: '1fr', lg: '15rem 1fr' }}
                    columnGap={16}
                    rowGap={6}
                >
                    <GridItem>
                        <Heading
                            as="h2"
                            fontSize={{ base: '1.5rem', md: '1.75rem' }}
                            lineHeight="1.2"
                        >
                            Get it
                        </Heading>
                    </GridItem>
                    <GridItem>
                        <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            color="inkMuted"
                            lineHeight="1.7"
                            maxW="34rem"
                        >
                            Installers and portable builds for Windows, macOS, and Linux. chaiNNer sets up its own Python environment the first time you open
                            it.
                        </Text>
                        <Flex
                            gap={5}
                            mt={8}
                            align="center"
                            flexWrap="wrap"
                        >
                            <Button
                                as={Link}
                                href="/download"
                                variant="primary"
                                size="lg"
                                px={8}
                            >
                                Download
                            </Button>
                            <Link
                                href="/nightly"
                                fontSize="sm"
                                fontWeight="600"
                                color="brand.300"
                                _hover={{ color: 'brand.200' }}
                            >
                                Nightly builds →
                            </Link>
                        </Flex>
                    </GridItem>
                </Grid>
            </Container>
        </Box>
    );
}

function Page({ stars }: { stars?: number }) {
    return (
        <Box w="100%">
            <Hero stars={stars} />
            <WhatItIs />
            <UseCases />
            <HowItWorks />
            <UnderTheHood />
            <OpenSource />
            <GetIt />
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
