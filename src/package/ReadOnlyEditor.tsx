/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { JSX } from "react";

import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import * as React from "react";
import { useEffect, useState } from "react";
import { CAN_USE_DOM } from "../package/shared/src/canUseDOM";

import { useSharedHistoryContext } from "./context/SharedHistoryContext";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import EmojisPlugin from "./plugins/EmojisPlugin";
import ImagesPlugin from "./plugins/ImagesPlugin";
import InlineImagePlugin from "./plugins/InlineImagePlugin";
import KeywordsPlugin from "./plugins/KeywordsPlugin";
import LinkPlugin from "./plugins/LinkPlugin";
import { ContentEditable as ContentEditableLex } from "@lexical/react/LexicalContentEditable";
import { useSettings } from "./context/SettingsContext";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import TwitterPlugin from "./plugins/TwitterPlugin";
import YouTubePlugin from "./plugins/YouTubePlugin";
import FigmaPlugin from "./plugins/FigmaPlugin";
import EquationsPlugin from "./plugins/EquationsPlugin";
import ExcalidrawPlugin from "./plugins/ExcalidrawPlugin";
import CollapsiblePlugin from "./plugins/CollapsiblePlugin";
import PageBreakPlugin from "./plugins/PageBreakPlugin";
import { LayoutPlugin } from "./plugins/LayoutPlugin/LayoutPlugin";

const ReadOnlyContentEditable: React.FC = () => (
  <ContentEditableLex className="prose bg-white text-black max-w-none outline-none min-h-[100px] px-4 py-2" />
);

export default function ReadOnlyEditor(): JSX.Element {
  const { historyState } = useSharedHistoryContext();
  const {
    settings: {
      isRichText,
      showTreeView,
      hasLinkAttributes,
      tableCellMerge,
      tableCellBackgroundColor,
      tableHorizontalScroll,
    },
  } = useSettings();
  const [editor] = useLexicalComposerContext();
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false);

  useEffect(() => {
    // Set the editor to read-only mode
    editor.setEditable(false);
  }, [editor]);

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener("resize", updateViewPortWidth);

    return () => {
      window.removeEventListener("resize", updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  return (
    <div
      className={`editor-container ${showTreeView ? "tree-view" : ""} ${
        !isRichText ? "plain-text" : ""
      }`}
    >
      {isRichText ? (
        <>
          <HistoryPlugin externalHistoryState={historyState} />
          <RichTextPlugin
            contentEditable={<ReadOnlyContentEditable />}
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <CodeHighlightPlugin />
          <EmojisPlugin />
          <HashtagPlugin />
          <ImagesPlugin />
          <InlineImagePlugin />
          <KeywordsPlugin />
          <LinkPlugin hasLinkAttributes={hasLinkAttributes} />
          <ListPlugin />
          <CheckListPlugin />
          <TablePlugin
            hasCellMerge={tableCellMerge}
            hasCellBackgroundColor={tableCellBackgroundColor}
            hasHorizontalScroll={tableHorizontalScroll}
          />
          <TwitterPlugin />
          <YouTubePlugin />
          <FigmaPlugin />
          <EquationsPlugin />
          <ExcalidrawPlugin />
          <CollapsiblePlugin />
          <PageBreakPlugin />
          <LayoutPlugin />
        </>
      ) : (
        <>
          <PlainTextPlugin
            contentEditable={<ReadOnlyContentEditable />}
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin externalHistoryState={historyState} />
        </>
      )}
    </div>
  );
}