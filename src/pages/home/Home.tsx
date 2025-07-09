import FloatingButton from "../../components/floating-button/FloatingButton";
import TopicCard from "../../components/topic-card/TopicCard";
import styles from "./Home.module.css";
import { useCardContext } from "../../data/contexts/CardsContext";

const Home = () => {
  const { deckList } = useCardContext();

  return (
    <div className={styles.page}>
      <FloatingButton onClick={() => {}} />
      {/* Home */}
      {/* <Topic /> */}
      <div className={styles.content}>
        {deckList.map((item) => {
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
