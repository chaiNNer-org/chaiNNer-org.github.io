/* eslint-disable react/display-name */
// https://choc-ui.com/docs/elements/headers
import { Button, Box, Icon, chakra, Flex, HStack, Link, Image } from '@chakra-ui/react';
import { memo } from 'react';
import { AiFillGithub } from 'react-icons/ai/index.js';
import Logo from '../assets/128x128.png';
import { discordLink, githubLink, kofiLink } from '../utils/links';
import { SiDiscord, SiKofi } from 'react-icons/si/index.js';

export const Header = memo(() => {
    const bg = 'gray.800';

    return (
        <Box
            pos="sticky"
            w={'full'}
            top={0}
            zIndex={10}
        >
            <chakra.header
                shadow={'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}
                bg={bg}
                borderTop="4px solid"
                borderTopColor="brand.500"
                w="full"
                overflowY="hidden"
                zIndex={10}
            >
                <chakra.div
                    h="4.5rem"
                    mx="auto"
                    maxW="1200px"
                >
                    <Flex
                        w="full"
                        h="full"
                        px="6"
                        align="center"
                        justify="space-between"
                    >
                        <Flex align="center">
                            <HStack
                                spacing="1"
                                as={'nav'}
                            >
                                <chakra.div mr={{ base: 3, sm: 9 }}>
                                    <Link href="/">
                                        <HStack>
                                            <Image
                                                src={Logo}
                                                boxSize="48px"
                                                maxW="none"
                                            />
                                        </HStack>
                                    </Link>
                                </chakra.div>
                                <Button
                                    bg="transparent"
                                    color="gray.300"
                                    display="inline-flex"
                                    alignItems="center"
                                    fontSize="md"
                                    fontWeight="500"
                                    borderRadius="lg"
                                    px={{ base: 3, sm: 6 }}
                                    py={2}
                                    transition="all 0.2s ease"
                                    _hover={{
                                        color: 'white',
                                        transform: 'translateY(-1px)',
                                    }}
                                    _focus={{
                                        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
                                    }}
                                    _active={{
                                        transform: 'translateY(0)',
                                    }}
                                    as={Link}
                                    href="/"
                                >
                                    Home
                                </Button>
                                <Button
                                    bg="transparent"
                                    color="gray.300"
                                    display="inline-flex"
                                    alignItems="center"
                                    fontSize="md"
                                    fontWeight="500"
                                    borderRadius="lg"
                                    px={{ base: 3, sm: 6 }}
                                    py={2}
                                    transition="all 0.2s ease"
                                    _hover={{
                                        color: 'white',
                                        transform: 'translateY(-1px)',
                                    }}
                                    _focus={{
                                        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
                                    }}
                                    _active={{
                                        transform: 'translateY(0)',
                                    }}
                                    as={Link}
                                    href="/download"
                                >
                                    Download
                                </Button>
                            </HStack>
                        </Flex>

                        <Flex
                            justify="flex-end"
                            w="full"
                            maxW="824px"
                            align="center"
                            color="gray.400"
                        >
                            <HStack spacing="4">
                                <Link
                                    isExternal
                                    aria-label="Go to the chaiNNer GitHub page"
                                    href={githubLink}
                                    p={2}
                                    borderRadius="lg"
                                    transition="all 0.2s ease"
                                    _hover={{
                                        transform: 'translateY(-1px)',
                                    }}
                                >
                                    <Icon
                                        as={AiFillGithub}
                                        display="block"
                                        transition="all 0.2s ease"
                                        w="6"
                                        h="6"
                                        color="gray.300"
                                        _hover={{
                                            color: 'brand.400',
                                        }}
                                    />
                                </Link>
                                <Link
                                    isExternal
                                    aria-label="Go to the chaiNNer Discord server"
                                    href={discordLink}
                                    p={2}
                                    borderRadius="lg"
                                    transition="all 0.2s ease"
                                    _hover={{
                                        transform: 'translateY(-1px)',
                                    }}
                                >
                                    <Icon
                                        as={SiDiscord}
                                        display="block"
                                        transition="all 0.2s ease"
                                        w="6"
                                        h="6"
                                        color="gray.300"
                                        _hover={{
                                            color: 'purple.400',
                                        }}
                                    />
                                </Link>
                                <Link
                                    isExternal
                                    aria-label="Go to the chaiNNer Ko-fi donation page"
                                    href={kofiLink}
                                    p={2}
                                    borderRadius="lg"
                                    transition="all 0.2s ease"
                                    _hover={{
                                        transform: 'translateY(-1px)',
                                    }}
                                >
                                    <Icon
                                        as={SiKofi}
                                        display="block"
                                        transition="all 0.2s ease"
                                        w="6"
                                        h="6"
                                        color="gray.300"
                                        _hover={{
                                            color: 'pink.400',
                                        }}
                                    />
                                </Link>
                            </HStack>
                        </Flex>
                    </Flex>
                </chakra.div>
            </chakra.header>
        </Box>
    );
});
