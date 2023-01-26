import { jsx, jsxs } from "react/jsx-runtime";
import React, { memo } from "react";
import { Box, chakra, Flex, HStack, Link, Image, Button, Icon, extendTheme, ChakraProvider, VStack, Center } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai/index.js";
import { SiDiscord, SiKofi } from "react-icons/si/index.js";
const discordLink = "https://discord.gg/pzvAKPKyHM";
const githubLink = "https://github.com/chaiNNer-org/chaiNNer";
const kofiLink = "https://ko-fi.com/T6T46KTTW";
const Context = React.createContext(void 0);
function PageContextProvider({ pageContext, children }) {
  return /* @__PURE__ */ jsx(Context.Provider, { value: pageContext, children });
}
const PageShell$1 = "";
const logoUrl = "/assets/128x128.da537210.png";
const Header = memo(() => {
  const bg = "gray.800";
  return /* @__PURE__ */ jsx(
    Box,
    {
      pos: "sticky",
      w: "full",
      top: 0,
      shadow: "lg",
      zIndex: 10,
      children: /* @__PURE__ */ jsx(
        chakra.header,
        {
          shadow: "lg",
          transition: "box-shadow 0.2s",
          bg,
          borderTop: "6px solid",
          borderTopColor: "brand.400",
          w: "full",
          overflowY: "hidden",
          zIndex: 10,
          children: /* @__PURE__ */ jsx(
            chakra.div,
            {
              h: "4.5rem",
              mx: "auto",
              maxW: "1200px",
              children: /* @__PURE__ */ jsxs(
                Flex,
                {
                  w: "full",
                  h: "full",
                  px: "6",
                  align: "center",
                  justify: "space-between",
                  children: [
                    /* @__PURE__ */ jsx(Flex, { align: "center", children: /* @__PURE__ */ jsxs(
                      HStack,
                      {
                        spacing: "1",
                        display: {
                          base: "none",
                          md: "flex"
                        },
                        children: [
                          /* @__PURE__ */ jsx(chakra.div, { mr: 9, children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(HStack, { children: /* @__PURE__ */ jsx(
                            Image,
                            {
                              src: logoUrl,
                              boxSize: "48px"
                            }
                          ) }) }) }),
                          /* @__PURE__ */ jsx(
                            Button,
                            {
                              bg,
                              color: "gray.400",
                              display: "inline-flex",
                              alignItems: "center",
                              fontSize: "md",
                              _hover: {
                                color: "gray.600"
                              },
                              _focus: {
                                boxShadow: "none"
                              },
                              as: Link,
                              href: "/",
                              children: "Home"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            Button,
                            {
                              bg,
                              color: "gray.400",
                              display: "inline-flex",
                              alignItems: "center",
                              fontSize: "md",
                              _hover: {
                                color: "gray.600"
                              },
                              _focus: {
                                boxShadow: "none"
                              },
                              as: Link,
                              href: "/download",
                              children: "Download"
                            }
                          )
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsx(
                      Flex,
                      {
                        justify: "flex-end",
                        w: "full",
                        maxW: "824px",
                        align: "center",
                        color: "gray.400",
                        children: /* @__PURE__ */ jsxs(
                          HStack,
                          {
                            spacing: "5",
                            display: {
                              base: "none",
                              md: "flex"
                            },
                            children: [
                              /* @__PURE__ */ jsx(
                                Link,
                                {
                                  isExternal: true,
                                  "aria-label": "Go to the chaiNNer GitHub page",
                                  href: githubLink,
                                  children: /* @__PURE__ */ jsx(
                                    Icon,
                                    {
                                      as: AiFillGithub,
                                      display: "block",
                                      transition: "color 0.2s",
                                      w: "5",
                                      h: "5",
                                      _hover: {
                                        color: "gray.600"
                                      }
                                    }
                                  )
                                }
                              ),
                              /* @__PURE__ */ jsx(
                                Link,
                                {
                                  isExternal: true,
                                  "aria-label": "Go to the chaiNNer Discord server",
                                  href: discordLink,
                                  children: /* @__PURE__ */ jsx(
                                    Icon,
                                    {
                                      as: SiDiscord,
                                      display: "block",
                                      transition: "color 0.2s",
                                      w: "5",
                                      h: "5",
                                      _hover: {
                                        color: "gray.600"
                                      }
                                    }
                                  )
                                }
                              ),
                              /* @__PURE__ */ jsx(
                                Link,
                                {
                                  isExternal: true,
                                  "aria-label": "Go to the chaiNNer Ko-fi donation page",
                                  href: kofiLink,
                                  children: /* @__PURE__ */ jsx(
                                    Icon,
                                    {
                                      as: SiKofi,
                                      display: "block",
                                      transition: "color 0.2s",
                                      w: "5",
                                      h: "5",
                                      _hover: {
                                        color: "gray.600"
                                      }
                                    }
                                  )
                                }
                              )
                            ]
                          }
                        )
                      }
                    )
                  ]
                }
              )
            }
          )
        }
      )
    }
  );
});
const config = {
  initialColorMode: "light",
  // TODO: Fix this
  useSystemColorMode: false
};
const theme = extendTheme({ config });
function PageShell({ children, pageContext }) {
  return /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(ChakraProvider, { theme, children: /* @__PURE__ */ jsx(PageContextProvider, { pageContext, children: /* @__PURE__ */ jsxs(
    VStack,
    {
      w: "full",
      h: "full",
      spacing: 0,
      minH: "100vh",
      className: "background",
      children: [
        /* @__PURE__ */ jsx(Header, {}),
        /* @__PURE__ */ jsx(
          Center,
          {
            h: "100%",
            minH: "calc(100vh - 7rem)",
            w: "full",
            p: 2,
            children: /* @__PURE__ */ jsx(
              Center,
              {
                h: "100%",
                mt: "0.5rem",
                children
              }
            )
          }
        )
      ]
    }
  ) }) }) });
}
function ShellWrapper({ children }) {
  return /* @__PURE__ */ jsx(
    Box,
    {
      h: "100%",
      minH: "100%",
      w: "1200px",
      minW: "1200px",
      bgColor: "gray.800",
      p: 6,
      borderRadius: "2xl",
      children
    }
  );
}
export {
  PageShell as P,
  ShellWrapper as S,
  discordLink as d,
  githubLink as g,
  logoUrl as l
};
