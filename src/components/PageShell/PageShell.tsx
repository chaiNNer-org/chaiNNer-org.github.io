/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { PageContextProvider } from '../../usePageContext';
import type { PageContext } from '../../types';
import './PageShell.scss';
import { Header } from '../Header';
import { ChakraProvider, VStack, Theme, extendTheme, Box, Center } from '@chakra-ui/react';

const config = {
    initialColorMode: 'light', // TODO: Fix this
    useSystemColorMode: false,
} as const;

export const theme = extendTheme({ config } as const) as Theme;

function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
    return (
        <React.StrictMode>
            <ChakraProvider theme={theme}>
                <PageContextProvider pageContext={pageContext}>
                    <VStack
                        w="full"
                        h="full"
                        spacing={0}
                        minH="100vh"
                        className="background"
                    >
                        <Header />
                        <Center
                            h="100%"
                            minH="calc(100vh - 7rem)"
                            w="full"
                            p={2}
                        >
                            <Center
                                h="100%"
                                mt="0.5rem"
                            >
                                {children}
                            </Center>
                        </Center>
                    </VStack>
                </PageContextProvider>
            </ChakraProvider>
        </React.StrictMode>
    );
}

function ShellWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Box
            h="100%"
            minH="100%"
            maxW="1200px"
            minW="380px"
            bgColor="gray.800"
            p={6}
            borderRadius="2xl"
        >
            {children}
        </Box>
    );
}

export { PageShell, ShellWrapper };
