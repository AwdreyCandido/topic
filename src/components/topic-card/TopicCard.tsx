import {
  HiEllipsisVertical,
  HiMiniFolder,
  HiMiniPlus,
  HiMiniXMark,
} from "react-icons/hi2";
import styles from "./TopicCard.module.css";
import { useRef, useState } from "react";
import Card from "../card/Card";

const TopicCard = () => {
  const [expand, setExpand] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const [cardList, setCardList] = useState([]);

  const handleNewTopic = () => {
    setCardList((prev) => [prev.length + 1, ...prev]);
  };

  const handleExpand = () => {
    const rect = cardRef.current.getBoundingClientRect();
    // console.log(rect.top, rect.left, rect.width, rect.height);
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
      // className={`${expand ? styles.expand : styles.card} ${
      //   expand ? "expand" : "pop-in"
      // }`}
    >
      {!expand ? (
        <div onClick={handleExpand}>
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
            <div className={styles.dashedIcon}>
              <HiMiniPlus />
            </div>
            <p>Last updated at: 01/04/2025</p>
          </div>
        </div>
      ) : (
        <div className={styles.topicPage}>
          <div className={styles.navbar}>
            <div className="flex gap-10">
              <div className={styles.info}>
                <h2>Topic Card</h2>
                <p>Last updated at: 01/04/2025</p>
              </div>

              <div className={styles.iconContainer}>
                <div className={styles.icon}>
                  <HiMiniFolder />
                </div>
                <p>Empty</p>
              </div>
            </div>
            <div className={styles.navActions}>
              <div onClick={handleExpand} className={styles.dashedIcon}>
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
            {cardList.map((item) => {
              return <Card key={item} />;
            })}
          </section>
        </div>
      )}
    </div>
  );
};

export default TopicCard;
