import React, { useEffect, useState } from "react";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";
import { useCardContext } from "../../data/contexts/CardsContext";

interface CardSummaryProps {
  selectedCard?: any;
  selectedTopicId: number;
}

const CardSummary: React.FC<CardSummaryProps> = ({
  selectedCard,
  selectedTopicId,
}) => {
  const [card, setCard] = useState<any | null>(null);
  const { selectedCardId, deckList, selectCard, selectedTopic } =
    useCardContext();

  // const topic = deckList.find((item) => item.id === selectedTopicId);
  const selected = selectedTopic?.flashcards.find(
    (card) => card.id === selectedCardId
  );

  useEffect(() => {
    // const selected: cardModel = cards[selectedCard];
    setCard(selectedCard);
  }, [selectedCard]);

  return (
    <section
      style={{ width: card ? "60vw" : "0px" }}
      className={`duration-300 font-figtree ${
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
            className="flex flex-col  min-h-[10rem] gap-2 mb-4 text-[1.4rem] font-medium outline-none cursor-text"
          >
            <div> {selected?.answer}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSummary;
