/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import logo from './assets/128x128.png';
import { PageContextProvider } from './usePageContext';
import type { PageContext } from './types';
import './PageShell.scss';
import { Link } from './Link';
import { Header } from './components/Header';
import { ChakraProvider, VStack, Theme, extendTheme } from '@chakra-ui/react';

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
                        {children}
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
