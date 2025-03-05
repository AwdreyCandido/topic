import { HiEllipsisVertical, HiMiniFolder, HiMiniPlus } from "react-icons/hi2";
import styles from "./TopicCard.module.css";
import { useState } from "react";

const TopicCard = () => {
  const [expand, setExpand] = useState(false);

  const handleExpand = () => {
    setExpand((prev) => !prev);
  };

  return (
    <div onClick={handleExpand} className={`${styles.card} ${expand ?styles.expand : ''} pop-in`}>
      <div>
        <div className={styles.title}>
          <p>Topic Card</p>
          <div className={styles.options}>
            <HiEllipsisVertical />
          </div>
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.icon}>
            <HiMiniFolder />
          </div>
          <p>Empty</p>
        </div>
      </div>

      <div className={styles.actionContainer}>
        <div className={styles.addIcon}>
          <HiMiniPlus />
        </div>
        <p>Last updated at: 01/04/2025</p>
      </div>
    </div>
  );
};

export default TopicCard;
