import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.scss';

import { ChakraProvider, Theme, extendTheme } from '@chakra-ui/react';

const config = {
    initialColorMode: 'light', // TODO: Fix this
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
