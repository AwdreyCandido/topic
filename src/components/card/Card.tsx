import React from "react";
import styles from "./Card.module.css";
import { Flashcard } from "../../data/models/types";
import Tag from "../tag/Tags";
import { topicTags } from "../../data/data";

interface CardProps {
  flashcard: Flashcard;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ flashcard, onClick }) => {
  const tags = topicTags.filter((item) => flashcard.tags?.includes(item.id));

  return (
    <div onClick={onClick} className={styles.card}>
      <p> {flashcard.question}</p>
      <div className="mt-4">
        <div className="border-b-[1px] mb-4 border-b-gray-200"></div>
        <div className="flex gap-2">
          {tags.map((item) => {
            return <Tag title={item.name} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
