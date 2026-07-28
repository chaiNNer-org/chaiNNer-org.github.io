/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Code, Heading, Link, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react';
import type { Components } from 'react-markdown';

/**
 * Body copy for a blog post: bigger and looser than the release notes theme,
 * since these are read rather than scanned. Headings sit below the post title.
 */
export const postMarkdownTheme: Components = {
    h2: (props) => (
        <Heading
            as="h2"
            fontSize={{ base: '1.125rem', md: '1.25rem' }}
            lineHeight="1.3"
            mt={12}
            mb={4}
            _first={{ mt: 0 }}
        >
            {props.children}
        </Heading>
    ),
    h3: (props) => (
        <Heading
            as="h3"
            fontSize="md"
            mt={8}
            mb={3}
            _first={{ mt: 0 }}
        >
            {props.children}
        </Heading>
    ),
    p: (props) => <Text mb={5}>{props.children}</Text>,
    em: (props) => (
        <Text
            as="em"
            fontStyle="italic"
            color="ink"
        >
            {props.children}
        </Text>
    ),
    strong: (props) => (
        <Text
            as="strong"
            fontWeight="600"
            color="ink"
        >
            {props.children}
        </Text>
    ),
    a: (props) => (
        <Link
            isExternal
            href={props.href}
            color="brand.300"
            textUnderlineOffset="2px"
            _hover={{ color: 'brand.200' }}
        >
            {props.children}
        </Link>
    ),
    ul: (props) => (
        <UnorderedList
            spacing={2}
            pl={5}
            mb={5}
        >
            {props.children}
        </UnorderedList>
    ),
    ol: (props) => (
        <OrderedList
            spacing={2}
            pl={5}
            mb={5}
        >
            {props.children}
        </OrderedList>
    ),
    li: (props) => <ListItem>{props.children}</ListItem>,
    code: (props) => (
        <Code
            bg="whiteAlpha.100"
            color="inkMuted"
            fontSize="0.85em"
            px={1.5}
            py={0.5}
            borderRadius="md"
        >
            {props.children}
        </Code>
    ),
    hr: () => (
        <Box
            as="hr"
            border={0}
            borderTop="1px solid"
            borderTopColor="line"
            my={10}
        />
    ),
};
