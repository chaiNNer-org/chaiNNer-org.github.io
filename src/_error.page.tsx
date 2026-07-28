/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Button, Container, Heading, Link, Text, VStack } from '@chakra-ui/react';

function Page({ is404 }: { is404: boolean }) {
    const heading = is404 ? 'Page not found' : 'Something went wrong';
    const body = is404
        ? 'That address does not lead anywhere. It may have moved, or it may never have existed.'
        : 'This page could not be loaded. Trying again may work.';

    return (
        <Box
            as="section"
            w="100%"
            py={{ base: 24, md: 32 }}
        >
            <Container maxW="1200px">
                <VStack
                    align="start"
                    spacing={5}
                    maxW="34rem"
                >
                    <Text
                        fontFamily="mono"
                        fontSize="sm"
                        color="inkFaint"
                    >
                        {is404 ? '404' : '500'}
                    </Text>
                    <Heading
                        as="h1"
                        fontSize={{ base: '1.75rem', md: '2rem' }}
                        lineHeight="1.15"
                    >
                        {heading}
                    </Heading>
                    <Text
                        fontSize={{ base: 'md', md: 'lg' }}
                        color="inkMuted"
                        lineHeight="1.7"
                    >
                        {body}
                    </Text>
                    <Button
                        as={Link}
                        href="/"
                        variant="hairline"
                        size="lg"
                        px={8}
                        mt={3}
                    >
                        Back to the homepage
                    </Button>
                </VStack>
            </Container>
        </Box>
    );
}

export { Page };

export const documentProps = {
    title: 'Page not found - chaiNNer',
    description: 'That address does not lead anywhere on chainner.app.',
    /** Error pages get a noindex and no canonical, since they stand for no real URL. */
    noindex: true,
};
