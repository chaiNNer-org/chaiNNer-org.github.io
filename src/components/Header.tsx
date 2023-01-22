/* eslint-disable react/display-name */
// https://choc-ui.com/docs/elements/headers
import { Button, Box, Icon, chakra, Flex, HStack, Link, Image } from '@chakra-ui/react';
import { memo } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import Logo from '../assets/128x128.png';
import { discordLink, githubLink, kofiLink } from '../utils/links';
import { SiDiscord, SiKofi } from 'react-icons/si';

export const Header = memo(() => {
    const bg = 'gray.800';

    return (
        <Box
            pos="sticky"
            w={'full'}
            top={0}
            shadow={'lg'}
            zIndex={10}
        >
            <chakra.header
                shadow={'lg'}
                transition="box-shadow 0.2s"
                bg={bg}
                borderTop="6px solid"
                borderTopColor="brand.400"
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
                                display={{
                                    base: 'none',
                                    md: 'flex',
                                }}
                            >
                                <chakra.div mr={9}>
                                    <Link href="/">
                                        <HStack>
                                            <Image
                                                src={Logo}
                                                boxSize="48px"
                                            />
                                        </HStack>
                                    </Link>
                                </chakra.div>
                                <Button
                                    bg={bg}
                                    color="gray.400"
                                    display="inline-flex"
                                    alignItems="center"
                                    fontSize="md"
                                    _hover={{
                                        color: 'gray.600',
                                    }}
                                    _focus={{
                                        boxShadow: 'none',
                                    }}
                                    as={Link}
                                    href="/"
                                >
                                    Home
                                </Button>
                                <Button
                                    bg={bg}
                                    color="gray.400"
                                    display="inline-flex"
                                    alignItems="center"
                                    fontSize="md"
                                    _hover={{
                                        color: 'gray.600',
                                    }}
                                    _focus={{
                                        boxShadow: 'none',
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
                            <HStack
                                spacing="5"
                                display={{
                                    base: 'none',
                                    md: 'flex',
                                }}
                            >
                                <Link
                                    isExternal
                                    aria-label="Go to the chaiNNer GitHub page"
                                    href={githubLink}
                                >
                                    <Icon
                                        as={AiFillGithub}
                                        display="block"
                                        transition="color 0.2s"
                                        w="5"
                                        h="5"
                                        _hover={{
                                            color: 'gray.600',
                                        }}
                                    />
                                </Link>
                                <Link
                                    isExternal
                                    aria-label="Go to the chaiNNer Discord server"
                                    href={discordLink}
                                >
                                    <Icon
                                        as={SiDiscord}
                                        display="block"
                                        transition="color 0.2s"
                                        w="5"
                                        h="5"
                                        _hover={{
                                            color: 'gray.600',
                                        }}
                                    />
                                </Link>
                                <Link
                                    isExternal
                                    aria-label="Go to the chaiNNer Ko-fi donation page"
                                    href={kofiLink}
                                >
                                    <Icon
                                        as={SiKofi}
                                        display="block"
                                        transition="color 0.2s"
                                        w="5"
                                        h="5"
                                        _hover={{
                                            color: 'gray.600',
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
