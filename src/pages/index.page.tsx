/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, Center, HStack, Image, Link, VStack, Box, Text, Heading, SimpleGrid, Icon, Container } from '@chakra-ui/react';
import { FaCogs, FaRocket, FaImage, FaDownload, FaMagic, FaDesktop } from 'react-icons/fa/index.js';
import '../index.scss';
import { PageProps } from '../types';
import Banner from '../assets/banner.png';

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
                            boxShadow="0 10px 25px -5px rgba(16, 185, 129, 0.4)"
                            transition="all 0.3s ease"
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: '0 20px 40px -5px rgba(16, 185, 129, 0.5)',
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
                            >
                                What is chaiNNer?
                            </Heading>
                            <Text
                                fontSize="xl"
                                color="gray.300"
                                maxW="4xl"
                                lineHeight="1.6"
                            >
                                A node-based image processing GUI aimed at making chaining image processing tasks easy and customizable. Born as an AI upscaling
                                application, chaiNNer has grown into an extremely flexible and powerful programmatic image processing application. ChaiNNer gives
                                you a level of customization of your image processing workflow that very few others do. Cross-platform for Windows, macOS, and
                                Linux.
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
                                    description="Build processing pipelines by dragging and connecting nodes in an intuitive visual interface. Full control over your workflow with incredibly complex tasks just by connecting a few nodes together."
                                    color="brand.500"
                                />
                                <FeatureCard
                                    icon={FaMagic}
                                    title="AI Upscaling"
                                    description="Leverage AI models for image upscaling with support for PyTorch, NCNN, ONNX, and TensorRT. Use architectures like ESRGAN, Real-ESRGAN, and many more via Spandrel."
                                    color="purple.400"
                                />
                                <FeatureCard
                                    icon={FaImage}
                                    title="GPU Accelerated"
                                    description="Full GPU support for Nvidia (CUDA/TensorRT), AMD (ROCm/NCNN), Apple Silicon (MPS), and Intel (NCNN). CPU fallback for all frameworks."
                                    color="blue.400"
                                />
                                <FeatureCard
                                    icon={FaRocket}
                                    title="Batch Processing"
                                    description="Process entire folders of images or video frames. Chain together complex operations for large-scale automated workflows."
                                    color="orange.400"
                                />
                                <FeatureCard
                                    icon={FaDownload}
                                    title="Self-Contained"
                                    description="No Python installation needed. ChaiNNer downloads an isolated integrated Python build and manages all dependencies automatically."
                                    color="cyan.400"
                                />
                                <FeatureCard
                                    icon={FaDesktop}
                                    title="Cross-Platform"
                                    description="Runs on Windows, macOS, and Linux. Available as an installer or portable zip for all platforms."
                                    color="green.400"
                                />
                            </SimpleGrid>
                        </VStack>

                        {/* Visual Demo Section */}
                        <VStack
                            spacing={12}
                            w="100%"
                        >
                            <Heading
                                size="xl"
                                color="white"
                                textAlign="center"
                            >
                                See It In Action
                            </Heading>
                            <Box
                                w="100%"
                                maxW="4xl"
                                bg="gray.800"
                                borderRadius="xl"
                                p={8}
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.1)"
                            >
                                <VStack spacing={6}>
                                    <Text
                                        color="gray.300"
                                        fontSize="lg"
                                        textAlign="center"
                                    >
                                        chaiNNer's intuitive node-based interface makes complex image processing simple
                                    </Text>
                                    <Image
                                        src="https://github.com/chaiNNer-org/chaiNNer/raw/main/docs/assets/screenshot.png"
                                        alt="chaiNNer interface screenshot showing the node editor"
                                        w="100%"
                                        maxW="5xl"
                                        borderRadius="lg"
                                        border="1px solid"
                                        borderColor="gray.600"
                                        filter="drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))"
                                    />
                                </VStack>
                            </Box>
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

export { Page };

export const documentProps = {
    title: 'chaiNNer - Node-Based Image Processing Software',
    description: 'A powerful node-based image processing GUI for batch processing and custom workflows. Features GPU acceleration, visual node editor, and cross-platform support for Windows, macOS, and Linux.',
    keywords: 'chaiNNer, image processing, node editor, batch processing, GPU acceleration, visual programming, workflow automation, cross-platform, Windows, macOS, Linux',
    image: 'https://chainner.app/banner.png',
};
