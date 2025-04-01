import {
  HiEllipsisVertical,
  HiMiniFolder,
  HiMiniPlus,
  HiMiniXMark,
} from "react-icons/hi2";
import styles from "./TopicCard.module.css";
import { useRef, useState } from "react";
import Card from "../card/Card";
import CardSummary from "../card-summary/CardSummary";
import { Flashcard, Topic } from "../../data/models/types";
import ExpandedCard from "../expanded-card/ExpandedCard";

interface TopicCardProps {
  topic: Topic;
  quantity?: number;
}

const TopicCard: React.FC<TopicCardProps> = ({ quantity, topic }) => {
  const [expand, setExpand] = useState(false);
  const [expandCard, setExpandCard] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const [cardList, setCardList] = useState([]);

  const handleNewTopic = () => {
    setCardList((prev) => [prev.length + 1, ...prev]);
  };

  

  const handleExpand = () => {
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current?.style.setProperty("--initial-top", `${rect.top}px`);
    cardRef.current?.style.setProperty("--initial-left", `${rect.left}px`);
    cardRef.current?.style.setProperty("--initial-width", `${rect.width}px`);
    cardRef.current?.style.setProperty("--initial-height", `${rect.height}px`);

    setExpand((prev) => !prev);
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.card} pop-in ${expand ? "expand" : "pop-in"}`}
    >
      {!expand ? (
        <div onClick={handleExpand}>
          <div>
            <div className={styles.title}>
              <p>{topic.name}</p>
              <div className={styles.options}>
                <HiEllipsisVertical />
              </div>
            </div>
            <div className={styles.iconContainer}>
              <div className={styles.icon}>
                <HiMiniFolder />
              </div>
              <p>{quantity ? `${quantity} Cards` : "Empty"}</p>
            </div>
          </div>
          <div className={styles.actionContainer}>
            <div className={styles.dashedIcon}>
              <HiMiniPlus />
            </div>
            <p>
              Last updated at: {`${new Date(topic.updatedAt!).toLocaleDateString()}`}
            </p>
          </div>
        </div>
      ) : (
        <ExpandedCard topic={topic} handleClose={handleExpand} />
      )}
    </div>
  );
};

export default TopicCard;
