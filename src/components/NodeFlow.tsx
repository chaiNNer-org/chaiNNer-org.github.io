/* eslint-disable react/display-name */
import { Box, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import { Card } from './Card';

const NODES = [
    { label: 'Load', detail: 'Images, folders, video frames' },
    { label: 'Transform', detail: 'Resize, color, blend, filter' },
    { label: 'Upscale', detail: 'ESRGAN, SPAN, OmniSR, and others' },
    { label: 'Save', detail: 'Write files, or run from the CLI' },
];

export const NodeFlow = memo(() => {
    return (
        <Box
            position="relative"
            w="100%"
        >
            <Box
                as="svg"
                aria-hidden="true"
                viewBox="0 0 1200 200"
                preserveAspectRatio="none"
                position="absolute"
                inset={0}
                w="100%"
                h="100%"
                color="cable.500"
                pointerEvents="none"
                display={{ base: 'none', md: 'block' }}
            >
                <path
                    className="cable-path"
                    d="M280 100 C320 60 350 60 390 100"
                />
                <path
                    className="cable-path"
                    d="M580 100 C620 140 650 140 690 100"
                />
                <path
                    className="cable-path"
                    d="M880 100 C920 60 950 60 990 100"
                />
            </Box>

            <SimpleGrid
                columns={{ base: 1, sm: 2, md: 4 }}
                spacing={4}
                position="relative"
            >
                {NODES.map((node, index) => (
                    <Card
                        key={node.label}
                        className="node-tile"
                        position="relative"
                        p={5}
                        minH="9rem"
                        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                        style={{ '--delay': `${index * 0.12}s` } as React.CSSProperties}
                    >
                        <Box
                            position="absolute"
                            right="-6px"
                            top="1.5rem"
                            boxSize="12px"
                            borderRadius="full"
                            bg="gray.900"
                            border="2px solid"
                            borderColor="brand.400"
                            display={{ base: 'none', md: 'block' }}
                        />
                        <Box
                            position="absolute"
                            left="-6px"
                            bottom="1.5rem"
                            boxSize="12px"
                            borderRadius="full"
                            bg="gray.900"
                            border="2px solid"
                            borderColor="cable.400"
                            display={{ base: 'none', md: 'block' }}
                        />
                        <VStack
                            align="start"
                            spacing={3}
                        >
                            <Text
                                fontFamily="mono"
                                fontSize="xs"
                                color="brand.300"
                            >
                                {`0${index + 1}`}
                            </Text>
                            <Heading
                                as="h3"
                                size="md"
                                color="white"
                            >
                                {node.label}
                            </Heading>
                            <Text
                                fontSize="sm"
                                color="gray.400"
                                lineHeight="1.6"
                            >
                                {node.detail}
                            </Text>
                        </VStack>
                    </Card>
                ))}
            </SimpleGrid>
        </Box>
    );
});
