/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { PageContextProvider } from '../../usePageContext';
import type { PageContext } from '../../types';
import './PageShell.scss';
import { Header } from '../Header';
import { ChakraProvider, VStack, Theme, extendTheme, Box, Center } from '@chakra-ui/react';

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
} as const;

export const theme = extendTheme({
    config,
    colors: {
        brand: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
        },
    },
    fonts: {
        heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
} as const) as Theme;

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
            bg="rgba(30, 41, 59, 0.8)"
            backdropFilter="blur(20px)"
            borderRadius="2xl"
            boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)"
            position="relative"
            bgColor="gray.800"
            p={6}
        >
            {children}
        </Box>
    );
}

export { PageShell, ShellWrapper };
