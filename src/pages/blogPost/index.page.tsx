/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Container, Divider, Grid, GridItem, Heading, Link, Text } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import '../../index.scss';
import ChakraUIRenderer from '../../utils/chakra-ui-markdown-renderer';
import { postMarkdownTheme } from '../../components/postMarkdownTheme';
import { formatPostDate, Post, releaseUrl } from '../../content/posts';

function Page({ post }: { post: Post }) {
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
                    {/* The date holds the left rail the section headings hold elsewhere. */}
                    <GridItem>
                        <Text
                            as="time"
                            dateTime={post.date}
                            display="block"
                            fontFamily="mono"
                            fontSize="sm"
                            color="inkFaint"
                            position={{ lg: 'sticky' }}
                            top={{ lg: '7rem' }}
                        >
                            {formatPostDate(post.date)}
                        </Text>
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
