import {
  HiEllipsisVertical,
  HiMiniFolder,
  HiMiniPlus,
  HiMiniXMark,
} from "react-icons/hi2";
import styles from "./ExpandedCard.module.css";
import { useEffect, useState } from "react";
import Card from "../card/Card";
import CardSummary from "../card-summary/CardSummary";
import { useCardContext } from "../../data/contexts/CardsContext";
import CreateCard from "../forms/create-card/CreateCard";

interface ExpandedCardProps {
  // topic: Topic;
  handleClose: () => void;
}

const ExpandedCard: React.FC<ExpandedCardProps> = ({ handleClose }) => {
  const [isCreateCard, setIsCreateCard] = useState(false)
  const { selectCard, selectedCardId, handleSetCardList, selectedTopic } =
    useCardContext();

  const handleNewTopic = () => {
    handleSetCardList([
      ...selectedTopic.flashcards,
      {
        id: 1 + Math.random(),
        question: "What is this lalala?",
        answer:
          "Lalala is a type of lalala lalala lalaaaaaaaaaaa lalalala  lalalal  lalalal  lallaalala",
        deckId: selectedTopic.id,
        createdAt: new Date("2025-04-01T12:00:00Z"),
        updatedAt: new Date("2025-04-01T12:00:00Z"),
      },
    ]);
  };

  useEffect(() => {
    console.log("rerender...");
  }, []);

  const handleSelectCard = (id: number) => {
    // setselectedCardId(id);
    selectCard(id);
  };

  const handleCreateCardModal = () => {
    setIsCreateCard(!isCreateCard);
  }

  return (
    <div className="flex">
      <div className={styles.topicPage}>
        <div className={styles.navbar}>
          <div className="flex gap-10">
            <div className={styles.info}>
              <h2>{selectedTopic.name}</h2>
              <p>
                Last updated at:{" "}
                {`${new Date(selectedTopic.updatedAt!).toLocaleDateString()}`}
              </p>
            </div>

            <div className={styles.iconContainer}>
              <div className={styles.icon}>
                <HiMiniFolder />
              </div>
              <p>
                {selectedTopic.flashcards.length
                  ? `${selectedTopic.flashcards.length} Cards`
                  : "Empty"}
              </p>
            </div>
          </div>
          <div className={styles.navActions}>
            <div onClick={handleClose} className={styles.dashedIcon}>
              <HiMiniXMark />
            </div>
            <div onClick={handleCreateCardModal} className={styles.dashedIcon}>
              <HiMiniPlus />
            </div>
            <div className={styles.dashedIcon}>
              <HiEllipsisVertical />
            </div>
          </div>
        </div>
        <section className={styles.topicContainer}>
          <div className={styles.cardsContainer}>
            {selectedTopic.flashcards.map((item) => {
              return (
                <Card
                  flashcard={item}
                  onClick={() => handleSelectCard(item.id)}
                  key={item.id}
                />
              );
            })}
          </div>
        </section>
      </div>

      {selectedCardId && (
        <CardSummary
          selectedCard={selectedCardId}
          selectedTopicId={selectedTopic.id}
        />
      )}

      {isCreateCard && <CreateCard onClose={handleCreateCardModal}/>}
    </div>
  );
};

export default ExpandedCard;
