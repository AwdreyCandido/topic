import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";
import { useCardContext } from "../../data/contexts/CardsContext";
import { blocks } from "../../data/blocks";
import { Block } from "../../data/models/types";

interface CardSummaryProps {
  selectedCard?: any;
  selectedTopicId?: number;
}

const CardSummary: React.FC<CardSummaryProps> = ({
  selectedCard,
  selectedTopicId,
}) => {
  const [selectedLine, setSelectedLine] = useState<any>(0);
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);
  const [card, setCard] = useState<any | null>(null);
  const [rows, setRows] = useState<Block[]>(blocks);
  const rowsRef = useRef(null);

  const { selectedCardId, deckList, selectCard, selectedTopic } =
    useCardContext();

  // const topic = deckList.find((item) => item.id === selectedTopicId);
  const selected = selectedTopic?.flashcards.find(
    (card) => card.id === selectedCardId
  );

  useLayoutEffect(() => {
    // const selected: cardModel = cards[selectedCard];
    setCard(selectedCard); // n apagar

    if (lastAddedId) {
      focusRow(lastAddedId);
    }
  }, [selectedCard, lastAddedId]);

  function handleAddLine(e: React.KeyboardEvent): void {
    if (e.key === "Enter") {
      e.preventDefault();
      const newPosition = selectedLine + 1;
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
    node.current.focus();

    const editable: HTMLElement = node.current.querySelector("[data-block-id]");
    if (editable) {
      console.log('editable', editable.getAttribute("data-block-position"))
      
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(editable);
      range.collapse(false); // place cursor at end
      sel?.removeAllRanges();
      sel?.addRange(range);
      setSelectedLine(editable.getAttribute("data-block-position"))
    }
  }

  return (
    <section
      style={{ width: card ? "60vw" : "0px" }}
      className={`duration-300 font-figtree text-neutral-800 ${
        card ? "border-l-[.1rem] border-black-5" : ""
      }`}
    >
      <div className={`overflow-y-auto h-full ${card ? "p-14" : "hidden"}`}>
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
            onKeyDown={(e) => handleAddLine(e)}
            className="flex flex-col min-h-[10rem] gap-2 mb-4 text-[1.4rem] font-medium outline-none cursor-text"
          >
            <div> {selected?.answer}</div>
            <div>
              {rows?.map((block, index) => {
                const Element = block.element as keyof JSX.IntrinsicElements;

                return (
                  <div key={index} data-block-type="outer-block">
                    <div data-block-type="container-block">
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
                            onClick={() => setSelectedLine(block.position)}
                            tabIndex={-1}
                            className="focus:outline-none"
                          >
                            <Element
                              className="min-h-[2.2rem] bg-blue-200 my-1"
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
