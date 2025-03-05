import { useState } from "react";
import FloatingButton from "../../components/floating-button/FloatingButton";
import TopicCard from "../../components/topic-card/TopicCard";
import Topic from "../../components/topic/Topic";
import styles from "./Home.module.css";

const Home = () => {
  const [cardList, setCardList] = useState([]);

  const handleNewTopic = () => {
    setCardList((prev) => [prev.length + 1,...prev]);
  };

  return (
    <div className={styles.page}>
      <FloatingButton onClick={handleNewTopic} />
      {/* Home */}
        {/* <Topic /> */}
      <div className={styles.content}>
        {cardList.map((item) => {
          return <TopicCard key={item} />;
        })}
      </div>
    </div>
  );
};

export default Home;
