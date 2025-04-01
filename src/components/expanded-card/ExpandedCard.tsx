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
import { Topic } from "../../data/models/types";
import { useCardContext } from "../../data/contexts/CardsContext";

interface ExpandedCardProps {
  topic: Topic;
  handleClose: () => void;
}

const ExpandedCard: React.FC<ExpandedCardProps> = ({ handleClose, topic }) => {
  // const [selectedCardId, setselectedCardId] = useState<number | null>(null);

  const [cardList, setCardList] = useState(topic.flashcards);
  const { selectCard, selectedCardId } = useCardContext();

  const handleNewTopic = () => {
    setCardList((prev) => [prev.length + 1, ...prev]);
  };

  useEffect(() => {
    console.log('rerender...')
  }, [])
  

  const handleSelectCard = (id: number) => {
    // setselectedCardId(id);
    selectCard(id)
  };

  return (
    <div className="flex">
      <div className={styles.topicPage}>
        <div className={styles.navbar}>
          <div className="flex gap-10">
            <div className={styles.info}>
              <h2>{topic.name}</h2>
              <p>
                Last updated at:{" "}
                {`${new Date(topic.updatedAt!).toLocaleDateString()}`}
              </p>
            </div>

            <div className={styles.iconContainer}>
              <div className={styles.icon}>
                <HiMiniFolder />
              </div>
              <p>
                {topic.flashcards.length
                  ? `${topic.flashcards.length} Cards`
                  : "Empty"}
              </p>
            </div>
          </div>
          <div className={styles.navActions}>
            <div onClick={handleClose} className={styles.dashedIcon}>
              <HiMiniXMark />
            </div>
            <div onClick={handleNewTopic} className={styles.dashedIcon}>
              <HiMiniPlus />
            </div>
            <div className={styles.dashedIcon}>
              <HiEllipsisVertical />
            </div>
          </div>
        </div>
        <section className={styles.topicContainer}>
          <div className={styles.cardsContainer}>
            {cardList.map((item) => {
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

      {selectedCardId && <CardSummary selectedCard={selectedCardId} selectedTopicId={topic.id} />}
    </div>
  );
};

export default ExpandedCard;
