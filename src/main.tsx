import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { ChakraProvider, Theme, extendTheme } from '@chakra-ui/react';

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
} as const;

export const theme = extendTheme({ config } as const) as Theme;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>
);
