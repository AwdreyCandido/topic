import React from "react";
import styles from "./Card.module.css";
import { Flashcard } from "../../data/models/types";


interface CardProps {
  flashcard: Flashcard;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ flashcard, onClick }) => {
  return (
    <div onClick={onClick} className={styles.card}>
      {flashcard.question}
    </div>
  );
};

export default Card;