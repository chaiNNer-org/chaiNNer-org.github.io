import { jsx } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { P as PageShell, l as logoUrl } from "./chunk-0606f1ca.js";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr";
import "react";
import "@chakra-ui/react";
import "react-icons/ai/index.js";
import "react-icons/si/index.js";
async function render(pageContext) {
  const { Page, pageProps } = pageContext;
  const pageHtml = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(PageShell, { pageContext, children: /* @__PURE__ */ jsx(Page, { ...pageProps }) })
  );
  const { documentProps } = pageContext.exports;
  const title = (documentProps == null ? void 0 : documentProps.title) ?? "chaiNNer";
  const desc = (documentProps == null ? void 0 : documentProps.description) ?? "chaiNNer's website";
  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;
  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    }
  };
}
const passToClient = ["pageProps", "urlPathname"];
export {
  passToClient,
  render
};
