import { jsxs, jsx } from "react/jsx-runtime";
import { VStack, Heading, Text } from "@chakra-ui/react";
function Page({ is404 }) {
  if (is404) {
    return /* @__PURE__ */ jsxs(VStack, { children: [
      /* @__PURE__ */ jsx(Heading, { color: "white", children: "404 Page Not Found" }),
      /* @__PURE__ */ jsx(Text, { color: "white", children: "This page could not be found." })
    ] });
  } else {
    return /* @__PURE__ */ jsxs(VStack, { children: [
      /* @__PURE__ */ jsx(Heading, { color: "white", children: "500 Internal Server Error" }),
      /* @__PURE__ */ jsx(Text, { color: "white", children: "Something went wrong." })
    ] });
  }
}
export {
  Page
};
