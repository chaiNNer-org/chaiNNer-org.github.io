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
                position="absolute"
                inset={0}
                w="100%"
                h="100%"
                color="cable.500"
                pointerEvents="none"
                display={{ base: 'none', md: 'block' }}
            >
                <line
                    className="cable-path"
                    x1="0"
                    y1="50%"
                    x2="100%"
                    y2="50%"
                />
            </Box>

            <SimpleGrid
                columns={{ base: 1, sm: 2, md: 4 }}
                spacing={6}
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
                        {index < NODES.length - 1 && (
                            <Box
                                position="absolute"
                                right="-6px"
                                top="50%"
                                transform="translateY(-50%)"
                                boxSize="12px"
                                borderRadius="full"
                                bg="gray.900"
                                border="2px solid"
                                borderColor="brand.400"
                                display={{ base: 'none', md: 'block' }}
                            />
                        )}
                        {index > 0 && (
                            <Box
                                position="absolute"
                                left="-6px"
                                top="50%"
                                transform="translateY(-50%)"
                                boxSize="12px"
                                borderRadius="full"
                                bg="gray.900"
                                border="2px solid"
                                borderColor="cable.400"
                                display={{ base: 'none', md: 'block' }}
                            />
                        )}
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
