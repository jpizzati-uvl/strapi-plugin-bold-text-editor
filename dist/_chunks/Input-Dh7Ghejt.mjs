import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import ReactContentEditable from "react-contenteditable";
import { inputFocusStyle, Field, Flex, IconButtonGroup, IconButton } from "@strapi/design-system";
import { useIntl } from "react-intl";
import { B as Bold } from "./index-UxQeNJna.mjs";
import { parse, NodeType } from "node-html-parser";
import showdown from "showdown";
const FormatClear = () => {
  const { colors } = useTheme();
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 48 48", fill: colors.neutral900, children: /* @__PURE__ */ jsx("path", { d: "m26.75 21.55-5.05-5 1.2-2.8h-3.95l-4.65-4.6h26.55v6.7H29.2ZM40.7 45.6 23.8 28.65l-4.55 10.6h-7.3l6.7-15.75L2.4 7.3l2.5-2.5 38.3 38.3Z" }) });
};
const Code = () => {
  const { colors } = useTheme();
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 48 48", fill: colors.neutral900, children: /* @__PURE__ */ jsx("path", { d: "M15.45 37.1 2.2 23.9l13.35-13.35 3.4 3.35L9 23.85l9.85 9.85Zm17 .15L29.1 33.9l9.95-9.95-9.85-9.85 3.35-3.4L45.8 23.9Z" }) });
};
const CodeOff = () => {
  const { colors } = useTheme();
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 48 48", fill: colors.neutral900, children: /* @__PURE__ */ jsx("path", { d: "M42.1 46.5 14.2 18.65 9 23.85l9.85 9.85-3.4 3.4L2.2 23.9l8.65-8.6L1.5 5.9 4 3.4 44.6 44ZM37.65 32l-3.35-3.35 4.75-4.7-9.85-9.85 3.35-3.4L45.8 23.9Z" }) });
};
const converter = new showdown.Converter();
converter.setOption("simpleLineBreaks", true);
const ContentEditable = styled(ReactContentEditable)`
  flex: 1;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  line-height: ${({ theme }) => theme.lineHeights[2]};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 1px solid transparent;
  background: ${({ theme }) => theme.colors.neutral0};
  padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[4]}`};
  color: ${({ theme }) => theme.colors.neutral800};
  ${inputFocusStyle()}

  b, strong {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;
const Preview = styled.div`
  background: ${({ theme }) => theme.colors.neutral100};
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[4]}`};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  line-height: ${({ theme }) => theme.lineHeights[1]};
  color: ${({ theme }) => theme.colors.neutral500};
`;
const executeCommand = (commandId, value) => {
  document.execCommand(commandId, false, value);
};
const reduceParsed = (html, bold = false) => {
  return html.childNodes?.reduce((acc, child) => {
    if (child.nodeType === NodeType.TEXT_NODE) {
      return [...acc, { type: "text", text: child.text, bold }];
    }
    if (child.nodeType === NodeType.ELEMENT_NODE && child.tagName === "BR") {
      return [...acc, { type: "break" }];
    }
    if (child.nodeType === NodeType.ELEMENT_NODE && child.childNodes && (child.tagName === "B" || child.tagName === "STRONG")) {
      return [...acc, ...reduceParsed(child, true)];
    }
    if (child.nodeType === NodeType.ELEMENT_NODE && child.childNodes && child.childNodes.length > 0) {
      return [...acc, ...reduceParsed(child)];
    }
    return acc;
  }, []) ?? [];
};
const toMarkdown = (parsed, clear = false) => {
  return parsed.reduce((acc, node) => {
    if (node.type === "break" && !clear) {
      return `${acc}  
`;
    }
    if (node.type === "text" && node.bold && !clear) {
      return `${acc}**${clear ? node.text?.replace(/(\n)/gm, "") : node.text}**`;
    }
    if (node.type === "text") {
      return acc + (clear ? node.text?.replace(/(\n)/gm, "") : node.text);
    }
    return acc;
  }, "");
};
const toHtml = (parsed, clear = false) => {
  return parsed.reduce((acc, node) => {
    if (node.type === "break" && !clear) {
      return clear ? acc : `${acc}<br>`;
    }
    if (node.type === "text" && node.bold && !clear) {
      return `${acc}<b>${node.text}</b>`;
    }
    if (node.type === "text") {
      return acc + node.text;
    }
    return acc;
  }, "");
};
const getValueToUpdate = (html, markdown, clear = false) => {
  const parsed = reduceParsed(parse(html));
  if (parsed.every((node) => node.type === "break")) {
    return "";
  }
  return markdown ? toMarkdown(parsed, clear) : toHtml(parsed, clear);
};
const getHtml = (value, markdown) => {
  return value && markdown ? converter.makeHtml(value) : value ?? "";
};
const Input = ({
  value,
  name,
  onChange,
  error,
  required,
  labelAction,
  attribute,
  hint
}) => {
  const ref = useRef(null);
  const { formatMessage } = useIntl();
  const [preview, setPreview] = useState(false);
  const markdown = !!(attribute.options && attribute.options.output === "markdown");
  const update = (value2) => {
    onChange({ target: { name, value: value2 } });
  };
  const handleOnPaste = (event) => {
    event.preventDefault();
    const plainText = event.clipboardData.getData("text/plain");
    const html = event.clipboardData.getData("text/html");
    update(getValueToUpdate(html || plainText, markdown));
  };
  const handleOnChange = (event) => {
    update(getValueToUpdate(getHtml(event.target.value, markdown), markdown));
  };
  const handleOnClear = () => {
    update(getValueToUpdate(getHtml(value, markdown), markdown, true));
  };
  const handleOnPreview = () => {
    setPreview((prev) => !prev);
  };
  const handleOnKeyDown = (event) => {
    if (event.key === "Escape") {
      ref.current?.blur();
    }
  };
  return /* @__PURE__ */ jsxs(Field.Root, { name, id: name, error, hint, children: [
    /* @__PURE__ */ jsx(Field.Label, { action: labelAction, required, children: name }),
    /* @__PURE__ */ jsx(Field.Hint, {}),
    /* @__PURE__ */ jsxs(Flex, { spacing: 2, children: [
      /* @__PURE__ */ jsx(
        ContentEditable,
        {
          innerRef: ref,
          html: getHtml(value, markdown),
          onPaste: handleOnPaste,
          onChange: handleOnChange,
          onKeyDown: handleOnKeyDown
        }
      ),
      /* @__PURE__ */ jsxs(IconButtonGroup, { children: [
        /* @__PURE__ */ jsx(
          IconButton,
          {
            withTooltip: false,
            size: "S",
            style: { "border-top-left-radius": "0px", "border-bottom-left-radius": "0px" },
            onClick: () => executeCommand("bold"),
            label: formatMessage({ id: "bold-title-editor.input.bold", defaultMessage: "Bold" }),
            children: /* @__PURE__ */ jsx(Bold, {})
          }
        ),
        /* @__PURE__ */ jsx(
          IconButton,
          {
            withTooltip: false,
            size: "S",
            onClick: handleOnClear,
            label: formatMessage({
              id: "bold-title-editor.input.clear",
              defaultMessage: "Clear format"
            }),
            children: /* @__PURE__ */ jsx(FormatClear, {})
          }
        ),
        /* @__PURE__ */ jsx(
          IconButton,
          {
            withTooltip: false,
            size: "S",
            onClick: handleOnPreview,
            label: formatMessage({
              id: "bold-title-editor.input.code",
              defaultMessage: "Show code"
            }),
            children: preview ? /* @__PURE__ */ jsx(Code, {}) : /* @__PURE__ */ jsx(CodeOff, {})
          }
        )
      ] })
    ] }),
    value && preview && /* @__PURE__ */ jsx(Preview, { children: value }),
    /* @__PURE__ */ jsx(Field.Error, {})
  ] });
};
export {
  Input as default
};
