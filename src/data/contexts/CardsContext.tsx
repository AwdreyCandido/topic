import { createContext, useContext, useState } from "react";
import { sampleDeck } from "../data";
import { Topic } from "../models/types";

interface CardContextProps {
  cardList: Topic[];
  selectCard: (id: number | null) => void;
  selectedCardId: number | null;
}

const CardContext = createContext({} as CardContextProps);

export const CardProvider = ({ children }) => {
  const [cardList, setCardList] = useState(sampleDeck);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  function selectCard(id: number | null) {
    setSelectedCardId(id);
  }

  const value = { selectCard, selectedCardId, cardList };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export const useCardContext = () => useContext(CardContext);
