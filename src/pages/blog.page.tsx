/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Heading, Link, Text, VStack } from '@chakra-ui/react';
import '../index.scss';
import { Prose, Section } from '../components/Section';
import { discordLink, githubLink } from '../utils/links';

interface Post {
    /** Path this post lives at, e.g. `/blog/first-post`. */
    href: string;
    title: string;
    /** ISO date (YYYY-MM-DD) the post was published. */
    date: string;
    /** One or two sentences describing what the post covers. */
    summary: string;
}

/**
 * Posts, newest first. The page renders the list when there is one and an
 * empty state when there is not, so adding the first post is a matter of
 * writing it and putting an entry here.
 */
const POSTS: Post[] = [];

function formatDate(iso: string): string {
    const date = new Date(`${iso}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

function PostList() {
    return (
        <Box maxW="42rem">
            {POSTS.map((post) => (
                <Box
                    as="article"
                    key={post.href}
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
                        {formatDate(post.date)}
                    </Text>
                    <Heading
                        as="h2"
                        fontSize="lg"
                        mt={2}
                    >
                        <Link
                            href={post.href}
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

function Page() {
    return (
        <Box w="100%">
            <Section
                as="h1"
                divider={false}
                heading="Blog"
            >
                <Prose>
                    <p>Notes on releases, and on how chaiNNer works when that is worth explaining at more length than a changelog allows.</p>
                </Prose>
                <Box mt={10}>{POSTS.length > 0 ? <PostList /> : <NothingYet />}</Box>
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
