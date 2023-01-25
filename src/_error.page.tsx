/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { VStack, Heading, Text } from '@chakra-ui/react';
import React from 'react';

function Page({ is404 }: { is404: boolean }) {
    if (is404) {
        return (
            <VStack>
                <Heading color="white">404 Page Not Found</Heading>
                <Text color="white">This page could not be found.</Text>
            </VStack>
        );
    } else {
        return (
            <VStack>
                <Heading color="white">500 Internal Server Error</Heading>
                <Text color="white">Something went wrong.</Text>
            </VStack>
        );
    }
}
export { Page };
