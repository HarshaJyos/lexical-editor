/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { JSX } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { TextNode, DOMConversionMap, $isTextNode } from "lexical";

import { isDevPlayground } from "./appSettings";
import { FlashMessageContext } from "./context/FlashMessageContext";
import { SettingsContext, useSettings } from "./context/SettingsContext";
import { SharedHistoryContext } from "./context/SharedHistoryContext";
import { ToolbarContext } from "./context/ToolbarContext";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import DocsPlugin from "./plugins/DocsPlugin";
import PasteLogPlugin from "./plugins/PasteLogPlugin";
import TestRecorderPlugin from "./plugins/TestRecorderPlugin";
import { parseAllowedFontSize } from "./plugins/ToolbarPlugin/fontSize";
import TypingPerfPlugin from "./plugins/TypingPerfPlugin";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";
import { parseAllowedColor } from "./ui/ColorPicker";
import ReadOnlyEditor from "./ReadOnlyEditor";
import { TableContext } from "./plugins/TablePlugin";

console.warn(
  "If you are profiling the playground app, please ensure you turn off the debug view. You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting."
);

const editorStateJSON = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Welcome to the playground",
            type: "text",
            version: 1,
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "heading",
        version: 1,
        tag: "h1",
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "In case you were wondering what the black box at the bottom is – it's the debug view, showing the current state of the editor. You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting.",
            type: "text",
            version: 1,
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "quote",
        version: 1,
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "The playground is a demo environment built with ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 16,
            mode: "normal",
            style: "",
            text: "@lexical/react",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: ". Try typing in ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 1,
            mode: "normal",
            style: "",
            text: "some text",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: " with ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 2,
            mode: "normal",
            style: "",
            text: "different",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: " formats.",
            type: "text",
            version: 1,
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Make sure to check out the various plugins in the toolbar. You can also use ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "#hashtags",
            type: "hashtag",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: " or @-mentions too!",
            type: "text",
            version: 1,
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "If you'd like to find out more about Lexical, you can:",
            type: "text",
            version: 1,
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
      {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Visit the ",
                type: "text",
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Lexical website",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: null,
                format: "",
                indent: 0,
                type: "link",
                version: 1,
                rel: null,
                target: null,
                title: null,
                url: "https://lexical.dev/",
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: " for documentation and more information.",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "listitem",
            version: 1,
            value: 1,
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Check out the code on our ",
                type: "text",
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "GitHub repository",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: null,
                format: "",
                indent: 0,
                type: "link",
                version: 1,
                rel: null,
                target: null,
                title: null,
                url: "https://github.com/facebook/lexical",
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: ".",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "listitem",
            version: 1,
            value: 2,
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Playground code can be found ",
                type: "text",
                version: 1,
              },
              {
                children: [
                  {
                    type: "text",
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "here",
                    version: 1,
                  },
                ],
                direction: null,
                format: "",
                indent: 0,
                type: "link",
                version: 1,
                rel: null,
                target: null,
                title: null,
                url: "https://github.com/facebook/lexical/tree/main/packages/lexical-playground",
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: ".",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "listitem",
            version: 1,
            value: 3,
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Join our ",
                type: "text",
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Discord Server",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: null,
                format: "",
                indent: 0,
                type: "link",
                version: 1,
                rel: null,
                target: null,
                title: null,
                url: "https://discord.com/invite/KmG4wQnnD9",
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: " and chat with the team.",
                type: "text",
                version: 1,
              },
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "listitem",
            version: 1,
            value: 4,
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "list",
        version: 1,
        listType: "bullet",
        start: 1,
        tag: "ul",
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Lastly, we're constantly adding cool new features to this playground. So make sure you check back here when you next get a chance ",
            type: "text",
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: "token",
            style: "",
            text: "🙂",
            type: "emoji",
            version: 1,
            className: "emoji happysmile",
          },
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: ".",
            type: "text",
            version: 1,
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
      {
        children: [
          {
            type: "excalidraw",
            version: 1,
            data: "{\"appState\":{\"exportBackground\":true,\"exportScale\":1,\"exportWithDarkMode\":false,\"isBindingEnabled\":true,\"isLoading\":false,\"name\":\"Untitled-2025-09-02-2035\",\"theme\":\"light\",\"viewBackgroundColor\":\"#ffffff\",\"viewModeEnabled\":false,\"zenModeEnabled\":false,\"zoom\":{\"value\":1}},\"elements\":[{\"id\":\"SoWHX_Wioijs-uiEh15Bb\",\"type\":\"rectangle\",\"x\":348.99998474121094,\"y\":149.40000915527344,\"width\":484.79998779296875,\"height\":300.00001525878906,\"angle\":0,\"strokeColor\":\"#1e1e1e\",\"backgroundColor\":\"transparent\",\"fillStyle\":\"solid\",\"strokeWidth\":2,\"strokeStyle\":\"solid\",\"roughness\":1,\"opacity\":100,\"groupIds\":[],\"frameId\":null,\"index\":\"a0\",\"roundness\":{\"type\":3},\"seed\":544432232,\"version\":25,\"versionNonce\":641979928,\"isDeleted\":false,\"boundElements\":null,\"updated\":1756825545664,\"link\":null,\"locked\":false},{\"id\":\"Zsrue-6_yaUt5AQdyMa6e\",\"type\":\"text\",\"x\":533.8000335693359,\"y\":259,\"width\":43.199981689453125,\"height\":25,\"angle\":0,\"strokeColor\":\"#1e1e1e\",\"backgroundColor\":\"transparent\",\"fillStyle\":\"solid\",\"strokeWidth\":2,\"strokeStyle\":\"solid\",\"roughness\":1,\"opacity\":100,\"groupIds\":[],\"frameId\":null,\"index\":\"a1\",\"roundness\":null,\"seed\":546394904,\"version\":9,\"versionNonce\":3416680,\"isDeleted\":false,\"boundElements\":null,\"updated\":1756825552691,\"link\":null,\"locked\":false,\"text\":\"Hello\",\"fontSize\":20,\"fontFamily\":5,\"textAlign\":\"left\",\"verticalAlign\":\"top\",\"containerId\":null,\"originalText\":\"Hello\",\"autoResize\":true,\"lineHeight\":1.25}],\"files\":{}}",
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
      {
        children: [],
        direction: null,
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
      {
        type: "figma",
        version: 1,
        format: "",
        documentID: "iEXyLNGiSWh6BAl22aC3F3",
      },
      {
        children: [
          {
            type: "poll",
            version: 1,
            options: [
              { text: "option1", uid: "ugerf", votes: [] },
              { text: "option2", uid: "nkhhg", votes: [0] },
            ],
            question: "Happy",
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
      {
        children: [],
        direction: null,
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
    ],
    direction: null,
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

function getExtraStyles(element: HTMLElement): string {
  let extraStyles = "";
  const fontSize = parseAllowedFontSize(element.style.fontSize);
  const backgroundColor = parseAllowedColor(element.style.backgroundColor);
  const color = parseAllowedColor(element.style.color);
  if (fontSize !== "" && fontSize !== "15px") {
    extraStyles += `font-size: ${fontSize};`;
  }
  if (backgroundColor !== "" && backgroundColor !== "rgb(255, 255, 255)") {
    extraStyles += `background-color: ${backgroundColor};`;
  }
  if (color !== "" && color !== "rgb(0, 0, 0)") {
    extraStyles += `color: ${color};`;
  }
  return extraStyles;
}

function buildImportMap(): DOMConversionMap {
  const importMap: DOMConversionMap = {};
  for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
    importMap[tag] = (importNode) => {
      const importer = fn(importNode);
      if (!importer) {
        return null;
      }
      return {
        ...importer,
        conversion: (element) => {
          const output = importer.conversion(element);
          if (
            output === null ||
            output.forChild === undefined ||
            output.after !== undefined ||
            output.node !== null
          ) {
            return output;
          }
          const extraStyles = getExtraStyles(element);
          if (extraStyles) {
            const { forChild } = output;
            return {
              ...output,
              forChild: (child, parent) => {
                const textNode = forChild(child, parent);
                if ($isTextNode(textNode)) {
                  textNode.setStyle(textNode.getStyle() + extraStyles);
                }
                return textNode;
              },
            };
          }
          return output;
        },
      };
    };
  }
  return importMap;
}

function App(): JSX.Element {
  const {
    settings: { emptyEditor, measureTypingPerf },
  } = useSettings();

  const initialConfig = {
    readOnly: true,
    editorState: emptyEditor ? undefined : JSON.stringify(editorStateJSON),
    html: { import: buildImportMap() },
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <ToolbarContext>
            <div className="editor-shell">
              <ReadOnlyEditor />
              {isDevPlayground ? (
                <>
                  <PasteLogPlugin />
                  <TestRecorderPlugin />
                </>
              ) : null}
              {measureTypingPerf ? <TypingPerfPlugin /> : null}
              <DocsPlugin />
            </div>
          </ToolbarContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}

export default function Read(): JSX.Element {
  return (
    <SettingsContext>
      <FlashMessageContext>
        <App />
      </FlashMessageContext>
    </SettingsContext>
  );
}