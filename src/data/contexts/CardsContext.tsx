import { JSX, createContext, useContext, useState } from "react";
import { sampleDeck } from "../data";
import { Flashcard, Topic } from "../models/types";

interface CardContextProps {
  deckList: Topic[];
  selectedTopic: Topic | null;
  selectCard: (id: number | null) => void;
  selectedCardId: number | null;
  handleSetCardList: (cards: Flashcard[]) => void;
  handleSetSelectedTopic: (id: number | null) => void;
}

interface CardProviderProps {
  children: JSX.Element;
}

const CardContext = createContext({} as CardContextProps);

export const CardProvider = ({ children }: CardProviderProps) => {
  const [deckList, setDeckList] = useState<Topic[]>(sampleDeck);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  function selectCard(id: number | null) {
    setSelectedCardId(id);
  }

  function handleSetCardList(cards: Flashcard[]) {
    if (!selectedTopic) return;
    console.log(cards);

    const updatedDeckList: Topic[] = deckList.map((topic: Topic) => {
      return topic.id === selectedTopic.id
        ? ({ ...topic, flashcards: cards, updatedAt: new Date() } as Topic)
        : topic;
    });

    setDeckList(updatedDeckList);
    setSelectedTopic({
      ...selectedTopic,
      flashcards: cards,
      updatedAt: new Date(),
    });

    // create the logic to update
  }

  function handleSetSelectedTopic(deckId: number) {
    if (!deckId) return;

    const deck = deckList.find((item) => item.id === deckId);
    if (deck) {
      setSelectedTopic(deck);
    }
  }

  const value = {
    deckList,
    selectedTopic,
    selectCard,
    selectedCardId,
    handleSetCardList,
    handleSetSelectedTopic,
  } as CardContextProps;

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export const useCardContext = () => useContext(CardContext);
