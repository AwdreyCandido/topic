import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HiOutlineDocumentText, HiOutlinePlusSmall } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";
import { useCardContext } from "../../data/contexts/CardsContext";
import { blocks } from "../../data/blocks";
import { Block } from "../../data/models/types";
import styles from "./CardSummary.module.css";
import { RiDraggable } from "react-icons/ri";

interface CardSummaryProps {
  selectedCard?: any;
  selectedTopicId?: number;
}

const CardSummary: React.FC<CardSummaryProps> = ({
  selectedCard,
  selectedTopicId,
}) => {
  const [selectedLine, setSelectedLine] = useState<number>(0);
  const [blockId, setblockId] = useState<number>(0);
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);
  const [card, setCard] = useState<any | null>(null);
  const [rows, setRows] = useState<Block[]>(blocks);
  const rowsRef = useRef(null);
  const lineRef = useRef(0);

  const { selectedCardId, deckList, selectCard, selectedTopic } =
    useCardContext();

  // const topic = deckList.find((item) => item.id === selectedTopicId);
  const selected = selectedTopic?.flashcards.find(
    (card) => card.id === selectedCardId
  );

  useLayoutEffect(() => {
    // const selected: cardModel = cards[selectedCard];
    setCard(selectedCard); // n apagar
    console.log(rowsRef);
    console.log(rows);
    if (lastAddedId) {
      focusRow(lastAddedId);
    }
  }, [selectedCard, lastAddedId]);

  function handleAddLine(e: React.KeyboardEvent): void {
    if (e.key === "Enter") {
      e.preventDefault();
      const newPosition = lineRef.current + 1;
      const newContent = [...rows];
      const newId = Math.random() + new Date().getUTCMilliseconds();
      const newBlock = {
        id: newId,
        type: "paragraph",
        element: "p",
        position: newPosition,
        content: [
          {
            type: "text",
            text: "this is an added paragraph" + (rows.length + 1),
            style: "",
            attributes: [],
          },
        ],
      };
      newContent.splice(newPosition, 0, newBlock);
      setLastAddedId(newBlock.id);
      const updated = newContent.map((b, i) => ({ ...b, position: i }));

      setRows(updated);
      console.log(selectedLine, newBlock, newContent);
    }
  }

  function getMap() {
    if (!rowsRef.current) {
      rowsRef.current = new Map<number, { current: HTMLElement }>();
    }
    return rowsRef.current;
  }

  function focusRow(id: number) {
    const map = getMap();
    const node = map.get(id);

    const editable: HTMLElement = node.current.querySelector("[data-block-id]");
    if (editable) {
      console.log("editable", editable.getAttribute("data-block-position"));

      editable.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      const position = editable.getAttribute("data-block-position");
      range.selectNodeContents(editable);
      range.collapse(false); // place cursor at end
      sel?.removeAllRanges();
      sel?.addRange(range);
      setSelectedLine(Number(position));
      lineRef.current = Number(position);
    }
  }

  function handleKeyEvent(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleAddLine(e);
      return;
    }

    if (["ArrowDown", "ArrowUp"].includes(e.key)) {
      requestAnimationFrame(() => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return;

        const commonAncestor = sel.getRangeAt(0).commonAncestorContainer;
        let position: string | null | unknown = null;

        if (commonAncestor?.nodeType === Node.TEXT_NODE) {
          position = commonAncestor?.parentElement?.getAttribute(
            "data-block-position"
          );
        } else if (commonAncestor?.nodeType === Node.ELEMENT_NODE) {
          position = (commonAncestor as Element)?.getAttribute(
            "data-block-position"
          );
        }

        if (position !== null) {
          const newPosition = Number(position);
          lineRef.current = newPosition;
          setSelectedLine(newPosition);
          console.log(newPosition, lineRef.current);
        }
      });
    }
  }

  return (
    <section
      style={{ width: card ? "60vw" : "0px", maxWidth: "60vw" }}
      className={`max-w-[60vw] duration-300 font-figtree text-neutral-800 ${
        card ? "border-l-[.1rem] border-black-5" : ""
      }`}
    >
      <div
        className={`overflow-y-auto h-full ${card ? "px-[60px] py-14" : "hidden"}`}
      >
        <div className="flex items-center justify-between pb-8 border-b-[1px] border-b-neutral-300 ">
          <div className="flex  items-center gap-2">
            <HiOutlineDocumentText className="text-[2.5rem] stroke-[1.4]" />
            <h3
              contentEditable="plaintext-only"
              className="text-[1.6rem] font-medium leading-tight outline-none cursor-text"
            >
              {selected?.question}
            </h3>
          </div>
          <div
            onClick={() => setCard(null)}
            className="flex justify-end items-center cursor-pointer"
          >
            <HiMiniXMark className="text-[2rem]" />
          </div>
        </div>
        <div className="pb-12 mt-12 text-dark border-b-[1px] border-b-neutral-300">
          <div
            contentEditable="true"
            suppressContentEditableWarning
            autoFocus
            onKeyDown={(e) => handleKeyEvent(e)}
            className="flex flex-col min-h-[10rem] gap-2 mb-4 text-[1.6rem] font-medium outline-none cursor-text"
          >
            <div> {selected?.answer}</div>
            <div>
              {rows?.map((block, index) => {
                const Element = block.element as keyof JSX.IntrinsicElements;

                return (
                  <div
                    className={styles.line}
                    key={index}
                    data-block-type="outer-block"
                  >
                    <div className={styles.icons}>
                      <div className={styles.icon}>
                        <HiOutlinePlusSmall />
                      </div>
                      <div className={styles.icon}>
                        <RiDraggable />
                      </div>
                    </div>
                    <div data-block-type="container-block" className="w-full">
                      {block.content.map((item) => {
                        return (
                          <div
                            key={block.id}
                            ref={(node) => {
                              const map = getMap();
                              if (node) map.set(block.id, { current: node });
                              else map.delete(block.id);
                            }}
                            data-block-type="content-block"
                            data-block-line={block.position}
                            data-content-type={block.type}
                            data-content-element={block.element}
                            onClick={() => {
                              console.log(lineRef, block.position);
                              setSelectedLine(block.position);
                              lineRef.current = block.position;
                            }}
                            tabIndex={-1}
                            className="focus:outline-none"
                          >
                            <Element
                              className="min-h-[2.2rem]"
                              data-block-id={block.id}
                              data-content-type={item.type}
                              data-block-position={block.position}
                            >
                              {item.text}
                            </Element>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSummary;
