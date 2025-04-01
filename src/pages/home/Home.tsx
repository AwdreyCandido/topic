import { useState } from "react";
import FloatingButton from "../../components/floating-button/FloatingButton";
import TopicCard from "../../components/topic-card/TopicCard";
import styles from "./Home.module.css";
import { sampleDeck } from "../../data/data";

const Home = () => {
  const [topicList, setTopicList] = useState(sampleDeck);

  const handleNewTopic = () => {
    // setCardList((prev) => [prev.length + 1,...prev]);
  };

  return (
    <div className={styles.page}>
      <FloatingButton onClick={handleNewTopic} />
      {/* Home */}
      {/* <Topic /> */}
      <div className={styles.content}>
        {topicList.map((item) => {
          return (
            <div>
              <TopicCard topic={item} quantity={item.flashcards.length} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
