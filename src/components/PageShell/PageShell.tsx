/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { PageContextProvider } from '../../usePageContext';
import type { PageContext } from '../../types';
import './PageShell.scss';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { ChakraProvider, VStack, Theme, extendTheme, Box } from '@chakra-ui/react';

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
} as const;

const SANS = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

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
        // The red of a connection in the node editor. Used only where something
        // is literally a cable or a port, never as a generic accent.
        cable: {
            300: '#fca5a5',
            400: '#f87171',
            500: '#ef4444',
            600: '#dc2626',
        },
    },
    semanticTokens: {
        colors: {
            canvas: 'gray.900',
            panel: 'gray.800',
            // Hairlines. `line` separates, `lineStrong` outlines something you can touch.
            line: 'rgba(255, 255, 255, 0.08)',
            lineStrong: 'rgba(255, 255, 255, 0.18)',
            ink: 'white',
            inkMuted: 'gray.300',
            inkFaint: 'gray.400',
        },
    },
    fonts: {
        heading: SANS,
        body: SANS,
        mono: MONO,
    },
    shadows: {
        outline: '0 0 0 3px rgba(96, 165, 250, 0.55)',
    },
    components: {
        Heading: {
            baseStyle: {
                color: 'ink',
                fontWeight: 700,
                letterSpacing: '-0.02em',
            },
        },
        Button: {
            baseStyle: {
                borderRadius: 'lg',
                fontWeight: 600,
                _focusVisible: { boxShadow: 'outline' },
            },
            variants: {
                // Filled blue. One per view.
                primary: {
                    bg: 'brand.600',
                    color: 'white',
                    _hover: { bg: 'brand.500', textDecoration: 'none', _disabled: { bg: 'gray.700' } },
                    _active: { bg: 'brand.700' },
                    _disabled: { bg: 'gray.700', color: 'gray.500', opacity: 1, cursor: 'not-allowed' },
                },
                // Outlined. Sits next to primary without competing with it.
                hairline: {
                    bg: 'transparent',
                    color: 'ink',
                    border: '1px solid',
                    borderColor: 'lineStrong',
                    _hover: { bg: 'whiteAlpha.100', borderColor: 'brand.400', textDecoration: 'none' },
                    _active: { bg: 'whiteAlpha.200' },
                },
                // Text-weight. For navigation and tertiary actions.
                quiet: {
                    bg: 'transparent',
                    color: 'inkMuted',
                    fontWeight: 500,
                    _hover: { color: 'ink', bg: 'whiteAlpha.100', textDecoration: 'none' },
                    _active: { bg: 'whiteAlpha.200' },
                },
            },
        },
    },
    styles: {
        global: {
            body: {
                bg: 'canvas',
                color: 'inkMuted',
                WebkitFontSmoothing: 'antialiased',
                textRendering: 'optimizeLegibility',
            },
            '::selection': {
                bg: 'brand.500',
                color: 'white',
            },
            // Chakra's reset clears the native ring and expects each component
            // to redraw it. Put it back once, here, so nothing can lose it.
            'a:focus-visible, button:focus-visible, [tabindex]:focus-visible': {
                outline: '2px solid',
                outlineColor: 'brand.400',
                outlineOffset: '3px',
                borderRadius: 'sm',
            },
            // Anchor targets clear the sticky header.
            ':target': {
                scrollMarginTop: '6rem',
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
                        spacing={0}
                        minH="100vh"
                        align="stretch"
                        className="canvas"
                    >
                        <Header />
                        <Box
                            as="main"
                            w="full"
                            flex="1"
                            display="flex"
                            flexDirection="column"
                        >
                            {children}
                        </Box>
                        <Footer />
                    </VStack>
                </PageContextProvider>
            </ChakraProvider>
        </React.StrictMode>
    );
}

export { PageShell };
