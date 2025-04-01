import React, { useEffect, useState } from "react";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { HiOutlineChartBar } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineGlobeAmericas } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";
import { useCardContext } from "../../data/contexts/CardsContext";

interface CardSummaryProps {
  selectedCard?: any;
  selectedTopicId: number;
}

const CardSummary: React.FC<CardSummaryProps> = ({ selectedCard, selectedTopicId }) => {
  const [card, setCard] = useState<any | null>(null);
  const { selectedCardId, cardList, selectCard } = useCardContext();

  const topic = cardList.find((item) => item.id === selectedTopicId);
  const selected = topic?.flashcards.find((card) => card.id === selectedCardId);



  useEffect(() => {
    // const selected: cardModel = cards[selectedCard];
    setCard(selectedCard);
  }, [selectedCard]);

  return (
    <section
      style={{ width: card ? "60vw" : "0px" }}
      className={`duration-300 font-dm ${
        card ? "border-l-[.1rem] border-black-5" : ""
      }`}
    >
      <div className={`${card ? "p-14" : "hidden"}`}>
        <div
          onClick={() => setCard(null)}
          className="flex justify-end items-center mb-4 cursor-pointer"
        >
          <HiMiniXMark className="text-[2rem]" />
        </div>
        <div className="flex items-end gap-2 pb-8 border-b-[1px] border-b-black-5">
          <HiOutlineDocumentText className="text-[2.8rem] stroke-[1.4] text-primary" />
          <h3 className="text-[1.6rem] font-medium leading-tight">
            {selected?.question}
          </h3>
        </div>
        <div className="pb-12 mt-12 text-dark border-b-[1px] border-b-black-5">
          <div className="flex flex-col gap-2 mb-4">
            <p className="text-[1.4rem] font-bold text-primary">
              {selected?.answer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSummary;