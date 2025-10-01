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
      <p> {flashcard.question}</p>
      <div className="mt-4">
        <div className="border-b-[1px] border-b-black-5"></div>
        <p>tags</p>
      </div>
    </div>
  );
};

export default Card;
