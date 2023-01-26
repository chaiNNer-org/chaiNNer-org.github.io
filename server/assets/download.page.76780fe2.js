import { jsx, jsxs } from "react/jsx-runtime";
import { B as Banner } from "./chunk-e9b7516e.js";
import { Button, Link, HStack, Text, Tag, Icon, VStack, Image as Image$1, Spacer, Box } from "@chakra-ui/react";
import UAParser from "ua-parser-js";
import { BsGithub, BsFillStarFill, BsFillQuestionDiamondFill, BsApple, BsWindows } from "react-icons/bs/index.js";
import { FaLinux } from "react-icons/fa/index.js";
import { MdDownload } from "react-icons/md/index.js";
import ReactMarkdown from "react-markdown";
import { memo } from "react";
import { g as githubLink, d as discordLink, S as ShellWrapper } from "./chunk-0606f1ca.js";
import { SiDiscord, SiKofi } from "react-icons/si/index.js";
import deepmerge from "deepmerge";
import { Text as Text$1, Code, Divider, Link as Link$1, ListItem, Heading, UnorderedList, OrderedList } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Checkbox } from "@chakra-ui/checkbox";
import { Table, Thead, Tbody, Tr, Td, Th } from "@chakra-ui/table";
import { chakra } from "@chakra-ui/system";
import "react-icons/ai/index.js";
const parser = new UAParser();
const OS = parser.getOS();
OS.name === "Windows";
OS.name === "Mac OS";
OS.name === "Linux";
OS.name === "Debian";
OS.name === "RedHat";
const GitHubButton = memo(({ stars }) => {
  return /* @__PURE__ */ jsx(
    Button,
    {
      colorScheme: "blue",
      leftIcon: /* @__PURE__ */ jsx(BsGithub, {}),
      as: Link,
      href: githubLink,
      children: /* @__PURE__ */ jsxs(HStack, { spacing: 2, children: [
        /* @__PURE__ */ jsx(Text, { children: "GitHub" }),
        stars !== void 0 && /* @__PURE__ */ jsx(Tag, { colorScheme: "gray", children: /* @__PURE__ */ jsxs(HStack, { spacing: 1, children: [
          /* @__PURE__ */ jsx(Icon, { as: BsFillStarFill }),
          /* @__PURE__ */ jsx(Text, { children: new Intl.NumberFormat("en", { notation: "compact" }).format(stars) })
        ] }) })
      ] })
    }
  );
});
const DiscordButton = memo(() => {
  return /* @__PURE__ */ jsx(
    Button,
    {
      colorScheme: "purple",
      leftIcon: /* @__PURE__ */ jsx(SiDiscord, {}),
      as: Link,
      href: discordLink,
      children: "Discord"
    }
  );
});
const KofiButton = memo(() => {
  return /* @__PURE__ */ jsx(
    Button,
    {
      colorScheme: "pink",
      leftIcon: /* @__PURE__ */ jsx(SiKofi, {}),
      as: Link,
      href: "https://ko-fi.com/T6T46KTTW",
      children: "Ko-fi"
    }
  );
});
function getCoreProps(props) {
  return props["data-sourcepos"] ? { "data-sourcepos": props["data-sourcepos"] } : {};
}
const defaults = {
  p: (props) => {
    const { children } = props;
    return /* @__PURE__ */ jsx(Text$1, { mb: 2, children });
  },
  em: (props) => {
    const { children } = props;
    return /* @__PURE__ */ jsx(Text$1, { as: "em", children });
  },
  blockquote: (props) => {
    const { children } = props;
    return /* @__PURE__ */ jsx(
      Code,
      {
        as: "blockquote",
        p: 2,
        children
      }
    );
  },
  code: (props) => {
    const { inline, children, className } = props;
    if (inline) {
      return /* @__PURE__ */ jsx(
        Code,
        {
          p: 2,
          children
        }
      );
    }
    return /* @__PURE__ */ jsx(
      Code,
      {
        className,
        whiteSpace: "break-spaces",
        display: "block",
        w: "full",
        p: 2,
        children
      }
    );
  },
  del: (props) => {
    const { children } = props;
    return /* @__PURE__ */ jsx(Text$1, { as: "del", children });
  },
  hr: (props) => {
    return /* @__PURE__ */ jsx(Divider, {});
  },
  a: Link$1,
  img: Image,
  text: (props) => {
    const { children } = props;
    return /* @__PURE__ */ jsx(Text$1, { as: "span", children });
  },
  ul: (props) => {
    const { ordered, children, depth } = props;
    const attrs = getCoreProps(props);
    let Element = UnorderedList;
    let styleType = "disc";
    if (ordered) {
      Element = OrderedList;
      styleType = "decimal";
    }
    if (depth === 1)
      styleType = "circle";
    return /* @__PURE__ */ jsx(
      Element,
      {
        spacing: 2,
        as: ordered ? "ol" : "ul",
        styleType,
        pl: 4,
        ...attrs,
        children
      }
    );
  },
  ol: (props) => {
    const { ordered, children, depth } = props;
    const attrs = getCoreProps(props);
    let Element = UnorderedList;
    let styleType = "disc";
    if (ordered) {
      Element = OrderedList;
      styleType = "decimal";
    }
    if (depth === 1)
      styleType = "circle";
    return /* @__PURE__ */ jsx(
      Element,
      {
        spacing: 2,
        as: ordered ? "ol" : "ul",
        styleType,
        pl: 4,
        ...attrs,
        children
      }
    );
  },
  li: (props) => {
    const { children, checked } = props;
    let checkbox = null;
    if (checked !== null && checked !== void 0) {
      checkbox = /* @__PURE__ */ jsx(
        Checkbox,
        {
          isChecked: checked,
          isReadOnly: true,
          children
        }
      );
    }
    return /* @__PURE__ */ jsx(
      ListItem,
      {
        ...getCoreProps(props),
        listStyleType: checked !== null ? "none" : "inherit",
        children: checkbox != null || children
      }
    );
  },
  heading: (props) => {
    const { level, children } = props;
    const sizes = ["2xl", "xl", "lg", "md", "sm", "xs"];
    return /* @__PURE__ */ jsx(
      Heading,
      {
        my: 4,
        as: `h${level}`,
        size: sizes[`${level - 1}`],
        ...getCoreProps(props),
        children
      }
    );
  },
  pre: (props) => {
    const { children } = props;
    return /* @__PURE__ */ jsx(chakra.pre, { ...getCoreProps(props), children });
  },
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: (props) => /* @__PURE__ */ jsx(Tr, { children: props.children }),
  td: (props) => /* @__PURE__ */ jsx(Td, { children: props.children }),
  th: (props) => /* @__PURE__ */ jsx(Th, { children: props.children })
};
function ChakraUIRenderer(theme, merge = true) {
  const elements = {
    p: defaults.p,
    em: defaults.em,
    blockquote: defaults.blockquote,
    code: defaults.code,
    del: defaults.del,
    hr: defaults.hr,
    a: defaults.a,
    img: defaults.img,
    text: defaults.text,
    ul: defaults.ul,
    ol: defaults.ol,
    li: defaults.li,
    h1: defaults.heading,
    h2: defaults.heading,
    h3: defaults.heading,
    h4: defaults.heading,
    h5: defaults.heading,
    h6: defaults.heading,
    pre: defaults.pre,
    table: defaults.table,
    thead: defaults.thead,
    tbody: defaults.tbody,
    tr: defaults.tr,
    td: defaults.td,
    th: defaults.th
  };
  if (theme != null && merge) {
    return deepmerge(elements, theme);
  }
  return elements;
}
function Page(pageProps) {
  const { latestVersion, dmgBuild, exeBuild, debBuild, rpmBuild, winZip, macZip, linuxZip, computedChangelog } = pageProps;
  let currentBuild;
  let zipBuild;
  let icon;
  switch (OS.name) {
    case "Windows":
      currentBuild = exeBuild;
      zipBuild = winZip;
      icon = BsWindows;
      break;
    case "Mac OS":
      currentBuild = dmgBuild;
      zipBuild = macZip;
      icon = BsApple;
      break;
    case "Debian":
      currentBuild = debBuild;
      zipBuild = linuxZip;
      icon = FaLinux;
      break;
    case "RedHat":
      currentBuild = rpmBuild;
      zipBuild = linuxZip;
      icon = FaLinux;
      break;
    case "Linux":
      currentBuild = debBuild;
      zipBuild = linuxZip;
      icon = FaLinux;
      break;
    default:
      icon = BsFillQuestionDiamondFill;
      break;
  }
  return /* @__PURE__ */ jsx(ShellWrapper, { children: /* @__PURE__ */ jsxs(
    VStack,
    {
      spacing: 8,
      mb: "auto",
      children: [
        /* @__PURE__ */ jsxs(
          HStack,
          {
            spacing: 6,
            w: "full",
            children: [
              /* @__PURE__ */ jsx(
                Image$1,
                {
                  src: Banner,
                  w: "360px"
                }
              ),
              /* @__PURE__ */ jsx(Spacer, {}),
              /* @__PURE__ */ jsx(GitHubButton, {}),
              /* @__PURE__ */ jsx(DiscordButton, {}),
              /* @__PURE__ */ jsx(KofiButton, {})
            ]
          }
        ),
        /* @__PURE__ */ jsxs(VStack, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              colorScheme: "green",
              w: 512,
              h: 32,
              borderRadius: "2xl",
              onClick: () => {
                if (currentBuild != null) {
                  window.location.href = currentBuild == null ? void 0 : currentBuild.browser_download_url;
                }
              },
              children: /* @__PURE__ */ jsxs(VStack, { children: [
                /* @__PURE__ */ jsxs(HStack, { children: [
                  /* @__PURE__ */ jsx(
                    Icon,
                    {
                      boxSize: 8,
                      as: MdDownload
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Text,
                    {
                      fontSize: 36,
                      fontWeight: "bold",
                      children: latestVersion != null ? `Download ${latestVersion == null ? void 0 : latestVersion.name}` : "Loading..."
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs(HStack, { children: [
                  /* @__PURE__ */ jsx(Icon, { as: icon }),
                  /* @__PURE__ */ jsx(Text, { fontSize: 18, children: OS.name })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxs(Text, { color: "white", children: [
            "Or download the",
            " ",
            /* @__PURE__ */ jsx(
              Link,
              {
                color: "blue.300",
                href: zipBuild == null ? void 0 : zipBuild.browser_download_url,
                children: "portable version (zip)"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Box,
          {
            color: "white",
            w: "full",
            bgColor: "gray.700",
            borderRadius: "lg",
            children: /* @__PURE__ */ jsx(
              Box,
              {
                mx: 2,
                p: 4,
                h: "49rem",
                w: "full",
                overflowY: "scroll",
                children: /* @__PURE__ */ jsx(
                  ReactMarkdown,
                  {
                    components: ChakraUIRenderer(),
                    skipHtml: true,
                    children: computedChangelog
                  }
                )
              }
            )
          }
        )
      ]
    }
  ) });
}
export {
  Page
};
