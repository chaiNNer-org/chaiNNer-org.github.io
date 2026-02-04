/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PageContextServer } from '../types';

async function onBeforeRender(pageContext: PageContextServer) {
    return {
        pageContext: {
            pageProps: {},
        },
    };
}

export { onBeforeRender };
