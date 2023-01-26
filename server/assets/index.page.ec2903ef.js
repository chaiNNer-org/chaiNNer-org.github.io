import { jsx, jsxs } from "react/jsx-runtime";
import { Center, VStack, Image, HStack, Button, Link } from "@chakra-ui/react";
import { B as Banner } from "./chunk-e9b7516e.js";
function Page(pageProps) {
  return /* @__PURE__ */ jsx(Center, { h: "100%", children: /* @__PURE__ */ jsxs(VStack, { h: "100%", children: [
    /* @__PURE__ */ jsx(
      Image,
      {
        src: Banner,
        w: "738px"
      }
    ),
    /* @__PURE__ */ jsx(HStack, { children: /* @__PURE__ */ jsx(
      Button,
      {
        as: Link,
        href: "/download",
        children: "Download"
      }
    ) })
  ] }) });
}
export {
  Page
};
