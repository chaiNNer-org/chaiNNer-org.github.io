/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Code, Heading, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import type { Components } from 'react-markdown';

/**
 * Release notes are body copy inside the page, not a document of their own, so
 * their headings sit below the page's own hierarchy and the type matches the
 * surrounding text. Overrides the vendored renderer's defaults rather than
 * editing it, since that file is third-party.
 */
export const releaseMarkdownTheme: Components = {
    h1: (props) => (
        <Heading
            as="h4"
            fontSize="md"
            mt={6}
            mb={2}
            _first={{ mt: 0 }}
        >
            {props.children}
        </Heading>
    ),
    h2: (props) => (
        <Heading
            as="h4"
            fontSize="md"
            mt={6}
            mb={2}
            _first={{ mt: 0 }}
        >
            {props.children}
        </Heading>
    ),
    h3: (props) => (
        <Heading
            as="h5"
            fontSize="sm"
            mt={5}
            mb={2}
            _first={{ mt: 0 }}
        >
            {props.children}
        </Heading>
    ),
    p: (props) => <Text mb={3}>{props.children}</Text>,
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
            mb={3}
        >
            {props.children}
        </UnorderedList>
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
            my={5}
        />
    ),
};
