/* eslint-disable react/display-name */
import { Box, Container, Flex, HStack, Image, Link, Text } from '@chakra-ui/react';
import { memo } from 'react';
import Logo from '../assets/128x128.png';
import { discordLink, githubLink, licenseLink, openModelDbLink, releasesLink } from '../utils/links';

const FOOTER_LINKS = [
    { label: 'GitHub', href: githubLink },
    { label: 'Discord', href: discordLink },
    { label: 'OpenModelDB', href: openModelDbLink },
    { label: 'Releases', href: releasesLink },
    { label: 'GPLv3', href: licenseLink },
];

export const Footer = memo(() => {
    return (
        <Box
            as="footer"
            w="100%"
            bg="canvas"
            borderTop="1px solid"
            borderTopColor="line"
            py={8}
        >
            <Container maxW="1200px">
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    align={{ base: 'start', md: 'center' }}
                    justify="space-between"
                    gap={5}
                >
                    <HStack spacing={3}>
                        <Image
                            src={Logo}
                            boxSize="22px"
                            maxW="none"
                            alt=""
                        />
                        <Text
                            fontSize="sm"
                            color="inkFaint"
                        >
                            chaiNNer, a node-based image processing editor
                        </Text>
                    </HStack>
                    <HStack
                        as="nav"
                        aria-label="Elsewhere"
                        spacing={6}
                        wrap="wrap"
                    >
                        {FOOTER_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                isExternal
                                href={link.href}
                                fontSize="sm"
                                color="inkFaint"
                                transition="color 0.15s ease"
                                _hover={{ color: 'brand.300' }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
});
