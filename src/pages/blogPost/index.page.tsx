/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Container, Divider, Grid, GridItem, Heading, HStack, Image, Link, Text } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import '../../index.scss';
import ChakraUIRenderer from '../../utils/chakra-ui-markdown-renderer';
import { postMarkdownTheme } from '../../components/postMarkdownTheme';
import { AUTHORS, formatPostDate, Post, releaseUrl, SOURCE_LABEL } from '../../content/post';
import { discordLink } from '../../utils/links';

function Page({ post }: { post: Post }) {
    const author = AUTHORS[post.author];

    return (
        <Box
            as="article"
            w="100%"
            py={{ base: 12, md: 20 }}
        >
            <Container maxW="1200px">
                <Grid
                    templateColumns={{ base: '1fr', lg: '15rem 1fr' }}
                    columnGap={16}
                    rowGap={{ base: 6, lg: 0 }}
                >
                    {/* The byline holds the left rail the section headings hold elsewhere. */}
                    <GridItem>
                        <Box
                            position={{ lg: 'sticky' }}
                            top={{ lg: '7rem' }}
                        >
                            <HStack spacing={3}>
                                <Image
                                    src={author.avatar}
                                    alt=""
                                    boxSize="2rem"
                                    maxW="none"
                                    flexShrink={0}
                                    borderRadius="full"
                                    bg="panel"
                                />
                                <Link
                                    isExternal
                                    href={author.url}
                                    rel="author noopener noreferrer"
                                    fontSize="sm"
                                    fontWeight="600"
                                    color="ink"
                                    _hover={{ color: 'brand.300', textDecoration: 'none' }}
                                >
                                    {author.name}
                                </Link>
                            </HStack>
                            <Text
                                as="time"
                                dateTime={post.date}
                                display="block"
                                mt={3}
                                fontFamily="mono"
                                fontSize="sm"
                                color="inkFaint"
                            >
                                {formatPostDate(post.date)}
                            </Text>
                        </Box>
                    </GridItem>

                    <GridItem minW={0}>
                        <Box maxW="38rem">
                            <Heading
                                as="h1"
                                fontSize={{ base: '1.75rem', md: '2rem' }}
                                lineHeight="1.15"
                            >
                                {post.title}
                            </Heading>
                            <Text
                                fontSize={{ base: 'md', md: 'lg' }}
                                color="inkMuted"
                                lineHeight="1.7"
                                mt={4}
                            >
                                {post.summary}
                            </Text>

                            <Divider
                                borderColor="line"
                                my={10}
                            />

                            <Box
                                fontSize={{ base: 'md', md: 'lg' }}
                                color="inkMuted"
                                lineHeight="1.75"
                            >
                                <ReactMarkdown
                                    components={ChakraUIRenderer(postMarkdownTheme)}
                                    skipHtml
                                >
                                    {post.body}
                                </ReactMarkdown>
                            </Box>

                            <Box
                                borderTop="1px solid"
                                borderTopColor="line"
                                mt={12}
                                pt={6}
                            >
                                {post.source !== undefined && (
                                    <Text
                                        fontSize="sm"
                                        color="inkFaint"
                                        lineHeight="1.6"
                                        mb={4}
                                    >
                                        {SOURCE_LABEL[post.source]}
                                        {post.source === 'discord' && (
                                            <>
                                                {', '}
                                                <Link
                                                    isExternal
                                                    href={discordLink}
                                                    color="brand.300"
                                                    textUnderlineOffset="2px"
                                                    _hover={{ color: 'brand.200' }}
                                                >
                                                    which you can still join
                                                </Link>
                                            </>
                                        )}
                                        .
                                    </Text>
                                )}
                                {post.tag != null && (
                                    <Link
                                        isExternal
                                        href={releaseUrl(post.tag)}
                                        display="block"
                                        fontSize="sm"
                                        fontWeight="600"
                                        color="brand.300"
                                        _hover={{ color: 'brand.200' }}
                                    >
                                        {`Release notes for ${post.tag} on GitHub →`}
                                    </Link>
                                )}
                                <Link
                                    href="/blog"
                                    display="block"
                                    mt={3}
                                    fontSize="sm"
                                    fontWeight="600"
                                    color="brand.300"
                                    _hover={{ color: 'brand.200' }}
                                >
                                    ← All posts
                                </Link>
                            </Box>
                        </Box>
                    </GridItem>
                </Grid>
            </Container>
        </Box>
    );
}

export { Page };
