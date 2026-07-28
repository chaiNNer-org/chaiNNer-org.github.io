/* eslint-disable react/display-name */
import { Button, chakra, Flex, HStack, Icon, Image, Link } from '@chakra-ui/react';
import { memo } from 'react';
import { AiFillGithub } from 'react-icons/ai/index.js';
import { SiDiscord, SiKofi } from 'react-icons/si/index.js';
import Logo from '../assets/128x128.png';
import { discordLink, githubLink, kofiLink } from '../utils/links';
import { usePageContext } from '../usePageContext';

const ICON_LINKS = [
    { label: 'Go to the chaiNNer GitHub repository', href: githubLink, icon: AiFillGithub, hover: 'brand.400' },
    { label: 'Go to the chaiNNer Discord server', href: discordLink, icon: SiDiscord, hover: 'purple.300' },
    { label: 'Go to the chaiNNer Ko-fi page', href: kofiLink, icon: SiKofi, hover: 'pink.300' },
];

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
];

export const Header = memo(() => {
    const { urlPathname } = usePageContext();

    return (
        <chakra.header
            pos="sticky"
            top={0}
            zIndex={10}
            w="full"
            borderTop="4px solid"
            borderTopColor="brand.500"
            borderBottom="1px solid"
            borderBottomColor="line"
            // Translucent so the hero screenshot keeps running underneath it.
            bg="rgba(23, 28, 39, 0.82)"
            backdropFilter="saturate(150%) blur(14px)"
        >
            <Flex
                h="4.5rem"
                maxW="1200px"
                mx="auto"
                px={4}
                align="center"
                gap={4}
            >
                <Link
                    href="/"
                    aria-label="chaiNNer home"
                    display="flex"
                    borderRadius="lg"
                    flexShrink={0}
                >
                    <Image
                        src={Logo}
                        boxSize="40px"
                        maxW="none"
                        alt=""
                    />
                </Link>

                <HStack
                    as="nav"
                    aria-label="Site"
                    spacing={1}
                    ml={{ base: 0, sm: 4 }}
                    display={{ base: 'none', md: 'flex' }}
                >
                    {NAV_LINKS.map((link) => {
                        const isCurrent = urlPathname === link.href;
                        return (
                            <Button
                                key={link.href}
                                as={Link}
                                href={link.href}
                                aria-current={isCurrent ? 'page' : undefined}
                                variant="quiet"
                                size="sm"
                                px={3}
                                fontSize="md"
                                color={isCurrent ? 'ink' : undefined}
                            >
                                {link.label}
                            </Button>
                        );
                    })}
                </HStack>

                <HStack
                    spacing={{ base: 1, sm: 2 }}
                    ml="auto"
                >
                    <Button
                        as={Link}
                        href="/download"
                        variant="primary"
                        size="sm"
                        px={5}
                        mr={{ base: 1, sm: 2 }}
                    >
                        Download
                    </Button>
                    {ICON_LINKS.map((item) => (
                        <Link
                            key={item.href}
                            isExternal
                            aria-label={item.label}
                            href={item.href}
                            display="flex"
                            p={2}
                            borderRadius="lg"
                            color="inkMuted"
                            transition="color 0.15s ease, background-color 0.15s ease"
                            _hover={{ color: item.hover, bg: 'whiteAlpha.100' }}
                        >
                            <Icon
                                as={item.icon}
                                boxSize={5}
                            />
                        </Link>
                    ))}
                </HStack>
            </Flex>
        </chakra.header>
    );
});
