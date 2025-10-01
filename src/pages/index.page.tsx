/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, Center, HStack, Image, Link, VStack, Box, Text, Heading, SimpleGrid, Icon, Container, Divider } from '@chakra-ui/react';
import { FaCogs, FaBrain, FaLayerGroup, FaRocket, FaImage, FaVideo, FaDownload, FaMagic } from 'react-icons/fa';
import '../index.scss';
import { PageProps } from '../types';
import Banner from '../assets/banner.png';

// @ts-expect-error - Complex union types in Chakra UI
function Page(pageProps: PageProps) {
    return (
        <Box w="100%">
            {/* Hero Section */}
            <Center
                h="100vh"
                w="100%"
            >
                <VStack spacing={12}>
                    <Image
                        src={Banner}
                        w="738px"
                        maxW="90vw"
                        filter="drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))"
                        transition="all 0.3s ease"
                        _hover={{
                            transform: 'scale(1.02)',
                            filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.4))',
                        }}
                    />
                    <HStack spacing={4}>
                        <Button
                            as={Link}
                            href="/download"
                            bg="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                            color="white"
                            size="lg"
                            px={8}
                            py={6}
                            borderRadius="xl"
                            fontWeight="600"
                            fontSize="lg"
                            boxShadow="0 10px 25px -5px rgba(16, 185, 129, 0.4), 0 4px 6px -2px rgba(16, 185, 129, 0.1)"
                            transition="all 0.3s ease"
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: '0 20px 40px -5px rgba(16, 185, 129, 0.5), 0 8px 12px -2px rgba(16, 185, 129, 0.2)',
                                bg: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                            }}
                            _active={{
                                transform: 'translateY(0)',
                            }}
                        >
                            Download
                        </Button>
                        <Button
                            as={Link}
                            href="/nightly"
                            bg="rgba(30, 41, 59, 0.8)"
                            color="white"
                            border="1px solid"
                            borderColor="rgba(255, 255, 255, 0.2)"
                            size="lg"
                            px={8}
                            py={6}
                            borderRadius="xl"
                            fontWeight="600"
                            fontSize="lg"
                            transition="all 0.3s ease"
                            _hover={{
                                bg: 'rgba(139, 92, 246, 0.1)',
                                borderColor: 'purple.400',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.3)',
                            }}
                            _active={{
                                transform: 'translateY(0)',
                            }}
                        >
                            Nightly
                        </Button>
                    </HStack>
                </VStack>
            </Center>

            {/* Feature Overview Section */}
            <Box
                w="100%"
                bg="transparent"
                py={20}
            >
                <Container maxW="6xl">
                    <VStack spacing={16}>
                        {/* Introduction */}
                        <VStack
                            spacing={6}
                            textAlign="center"
                        >
                            <Heading
                                size="2xl"
                                color="white"
                                fontWeight="700"
                                bgGradient="linear(to-r, brand.500, purple.400)"
                                bgClip="text"
                            >
                                What is chaiNNer?
                            </Heading>
                            <Text
                                fontSize="xl"
                                color="gray.300"
                                maxW="4xl"
                                lineHeight="1.6"
                            >
                                chaiNNer is a powerful node-based image processing application that lets you create custom workflows through an intuitive visual
                                editor. Build complex processing pipelines by connecting nodes for image manipulation, enhancement, and batch processing.
                            </Text>
                        </VStack>

                        {/* Key Features */}
                        <VStack
                            spacing={12}
                            w="100%"
                        >
                            <Heading
                                size="xl"
                                color="white"
                                textAlign="center"
                            >
                                Key Features
                            </Heading>
                            <SimpleGrid
                                columns={{ base: 1, md: 2, lg: 3 }}
                                spacing={8}
                                w="100%"
                            >
                                <FeatureCard
                                    icon={FaCogs}
                                    title="Visual Node Editor"
                                    description="Build processing pipelines by dragging and connecting nodes in an intuitive visual interface."
                                    color="brand.500"
                                />
                                <FeatureCard
                                    icon={FaImage}
                                    title="Image Processing"
                                    description="Comprehensive image manipulation tools including resize, crop, rotate, filter, and color adjustment."
                                    color="blue.400"
                                />
                                <FeatureCard
                                    icon={FaLayerGroup}
                                    title="Node Library"
                                    description="Extensive collection of processing nodes for filters, transforms, effects, and format conversions."
                                    color="green.400"
                                />
                                <FeatureCard
                                    icon={FaRocket}
                                    title="Batch Processing"
                                    description="Process multiple images or video frames simultaneously for efficient large-scale operations."
                                    color="orange.400"
                                />
                                <FeatureCard
                                    icon={FaDownload}
                                    title="Self-Contained"
                                    description="Integrated dependency management with isolated Python environment - no system conflicts."
                                    color="cyan.400"
                                />
                                <FeatureCard
                                    icon={FaMagic}
                                    title="AI Upscaling"
                                    description="Leverage AI models for image upscaling with support for PyTorch, NCNN, and ONNX frameworks. Use models like ESRGAN, Real-ESRGAN, and GFPGAN."
                                    color="purple.400"
                                />
                            </SimpleGrid>
                        </VStack>

                        <Divider borderColor="gray.600" />

                        {/* Use Cases */}
                        <VStack
                            spacing={12}
                            w="100%"
                        >
                            <Heading
                                size="xl"
                                color="white"
                                textAlign="center"
                            >
                                Popular Use Cases
                            </Heading>
                            <SimpleGrid
                                columns={{ base: 1, md: 2 }}
                                spacing={8}
                                w="100%"
                            >
                                <UseCaseCard
                                    icon={FaImage}
                                    title="Image Enhancement"
                                    description="Apply filters, adjust colors, sharpen details, and enhance image quality using traditional and advanced processing techniques."
                                    examples={['Color correction', 'Noise reduction', 'Sharpening', 'Contrast adjustment']}
                                    color="blue.400"
                                />
                                <UseCaseCard
                                    icon={FaVideo}
                                    title="Batch Processing"
                                    description="Automate repetitive tasks like resizing, cropping, format conversion, and organizing large image datasets efficiently."
                                    examples={['Format conversion', 'Batch resizing', 'Watermarking', 'Metadata processing']}
                                    color="green.400"
                                />
                            </SimpleGrid>
                        </VStack>
                    </VStack>
                </Container>
            </Box>
        </Box>
    );
}

// Feature Card Component
function FeatureCard({ icon, title, description, color }: { icon: any; title: string; description: string; color: string }) {
    return (
        <Box
            p={6}
            bg="gray.800"
            borderRadius="xl"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.1)"
            transition="all 0.3s ease"
            _hover={{
                transform: 'translateY(-2px)',
                borderColor: color,
                boxShadow: `0 4px 12px rgba(59, 130, 246, 0.3)`,
            }}
        >
            <VStack
                spacing={4}
                align="start"
            >
                <Icon
                    as={icon}
                    boxSize={8}
                    color={color}
                />
                <Heading
                    size="md"
                    color="white"
                >
                    {title}
                </Heading>
                <Text
                    color="gray.300"
                    lineHeight="1.6"
                >
                    {description}
                </Text>
            </VStack>
        </Box>
    );
}

// Use Case Card Component
function UseCaseCard({ icon, title, description, examples, color }: { icon: any; title: string; description: string; examples: string[]; color: string }) {
    return (
        <Box
            p={8}
            bg="gray.800"
            borderRadius="xl"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.1)"
            transition="all 0.3s ease"
            _hover={{
                transform: 'translateY(-2px)',
                borderColor: color,
                boxShadow: `0 4px 12px rgba(59, 130, 246, 0.3)`,
            }}
        >
            <VStack
                spacing={6}
                align="start"
            >
                <HStack spacing={4}>
                    <Icon
                        as={icon}
                        boxSize={10}
                        color={color}
                    />
                    <Heading
                        size="lg"
                        color="white"
                    >
                        {title}
                    </Heading>
                </HStack>
                <Text
                    color="gray.300"
                    lineHeight="1.6"
                    fontSize="lg"
                >
                    {description}
                </Text>
                <VStack
                    spacing={2}
                    align="start"
                    w="100%"
                >
                    <Text
                        color="gray.400"
                        fontSize="sm"
                        fontWeight="600"
                        textTransform="uppercase"
                    >
                        Examples:
                    </Text>
                    {examples.map((example, index) => (
                        <Text
                            key={index}
                            color="gray.300"
                            fontSize="sm"
                        >
                            • {example}
                        </Text>
                    ))}
                </VStack>
            </VStack>
        </Box>
    );
}

export { Page };
