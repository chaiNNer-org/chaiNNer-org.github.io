/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import logo from './assets/128x128.png';
import { PageContextProvider } from './usePageContext';
import type { PageContext } from './types';
import './PageShell.scss';
import { Link } from './Link';
import { Header } from './components/Header';
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
                    >
                        <Header />
                        <Center
                            h="100%"
                            minH="100vh"
                            w="full"
                            p={2}
                            className="background"
                        >
                            <Box
                                h="100%"
                                minH="100vh"
                                mt="0.5rem"
                            >
                                <Box
                                    h="full"
                                    w="1200px"
                                    minH="calc(100vh - 7rem)"
                                    minW="1200px"
                                    bgColor="gray.800"
                                    p={6}
                                    borderRadius="2xl"
                                >
                                    {children}
                                </Box>
                            </Box>
                        </Center>
                    </VStack>
                </PageContextProvider>
            </ChakraProvider>
        </React.StrictMode>
    );
}

// function Layout({ children }: { children: React.ReactNode }) {
//     return (
//         <div
//             style={{
//                 display: 'flex',
//                 maxWidth: 900,
//                 margin: 'auto',
//             }}
//         >
//             {children}
//         </div>
//     );
// }

// function Sidebar({ children }: { children: React.ReactNode }) {
//     return (
//         <div
//             style={{
//                 padding: 20,
//                 flexShrink: 0,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 lineHeight: '1.8em',
//             }}
//         >
//             {children}
//         </div>
//     );
// }

// function Content({ children }: { children: React.ReactNode }) {
//     return (
//         <div
//             style={{
//                 padding: 20,
//                 paddingBottom: 50,
//                 borderLeft: '2px solid #eee',
//                 minHeight: '100vh',
//             }}
//         >
//             {children}
//         </div>
//     );
// }

// function Logo() {
//     return (
//         <div
//             style={{
//                 marginTop: 20,
//                 marginBottom: 10,
//             }}
//         >
//             <a href="/">
//                 <img
//                     src={logo}
//                     height={64}
//                     width={64}
//                     alt="logo"
//                 />
//             </a>
//         </div>
//     );
// }

export { PageShell };
