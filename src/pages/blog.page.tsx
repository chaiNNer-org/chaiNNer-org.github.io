/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Heading, Link, Text, VStack } from '@chakra-ui/react';
import '../index.scss';
import { Prose, Section } from '../components/Section';
import { discordLink, githubLink } from '../utils/links';
import { formatPostDate, PostMeta, SOURCE_SHORT } from '../content/post';

function PostList({ posts }: { posts: PostMeta[] }) {
    return (
        <Box maxW="42rem">
            {posts.map((post) => (
                <Box
                    as="article"
                    key={post.slug}
                    borderTop="1px solid"
                    borderTopColor="line"
                    pt={5}
                    pb={8}
                >
                    <Text
                        as="time"
                        dateTime={post.date}
                        display="block"
                        fontFamily="mono"
                        fontSize="xs"
                        color="inkFaint"
                    >
                        {formatPostDate(post.date)}
                        {post.source !== undefined && (
                            <Text
                                as="span"
                                color="whiteAlpha.400"
                            >{` · ${SOURCE_SHORT[post.source]}`}</Text>
                        )}
                    </Text>
                    <Heading
                        as="h2"
                        fontSize="lg"
                        mt={2}
                    >
                        <Link
                            href={`/blog/${post.slug}`}
                            _hover={{ color: 'brand.300', textDecoration: 'none' }}
                        >
                            {post.title}
                        </Link>
                    </Heading>
                    <Text
                        mt={2}
                        fontSize="md"
                        color="inkFaint"
                        lineHeight="1.7"
                    >
                        {post.summary}
                    </Text>
                </Box>
            ))}
        </Box>
    );
}

/** Says the page is empty, and points at where things are actually written down today. */
function NothingYet() {
    return (
        <VStack
            align="start"
            spacing={5}
            maxW="38rem"
            borderTop="1px solid"
            borderTopColor="line"
            pt={8}
        >
            <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="inkMuted"
                lineHeight="1.7"
            >
                Nothing has been posted here yet.
            </Text>
            <Text
                fontSize="md"
                color="inkFaint"
                lineHeight="1.7"
            >
                Until there is, what gets written down lives in two places: release notes on the{' '}
                <Link
                    href="/download"
                    color="brand.300"
                    textUnderlineOffset="2px"
                    _hover={{ color: 'brand.200' }}
                >
                    download page
                </Link>
                , and everything else in{' '}
                <Link
                    isExternal
                    href={githubLink}
                    color="brand.300"
                    textUnderlineOffset="2px"
                    _hover={{ color: 'brand.200' }}
                >
                    GitHub issues
                </Link>{' '}
                and the{' '}
                <Link
                    isExternal
                    href={discordLink}
                    color="brand.300"
                    textUnderlineOffset="2px"
                    _hover={{ color: 'brand.200' }}
                >
                    Discord
                </Link>
                .
            </Text>
        </VStack>
    );
}

function Page({ posts }: { posts: PostMeta[] }) {
    return (
        <Box w="100%">
            <Section
                as="h1"
                divider={false}
                heading="Blog"
            >
                <Prose>
                    <p>Release announcements. These get written when a release needs more explaining than its changelog gives it.</p>
                </Prose>
                <Box mt={10}>{posts.length > 0 ? <PostList posts={posts} /> : <NothingYet />}</Box>
            </Section>
        </Box>
    );
}

export { Page };

export const documentProps = {
    title: 'chaiNNer Blog - Release Notes and Project Updates',
    description: 'Posts about chaiNNer releases, features, and how the node-based image processing editor works. Written by the maintainers of the project.',
    keywords: 'chaiNNer blog, chaiNNer updates, image processing news, node editor releases',
    image: 'https://chainner.app/banner.png',
};
