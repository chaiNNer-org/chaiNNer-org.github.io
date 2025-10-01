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
        gray: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
        }
    },
    fonts: {
        heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    styles: {
        global: {
            body: {
                bg: 'gray.900',
                color: 'white',
            },
        },
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
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.1)"
            p={8}
            borderRadius="2xl"
            boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)"
            position="relative"
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '2xl',
                padding: '1px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'xor',
                WebkitMaskComposite: 'xor',
                zIndex: -1,
            }}
        >
            {children}
        </Box>
    );
}

export { PageShell, ShellWrapper };
