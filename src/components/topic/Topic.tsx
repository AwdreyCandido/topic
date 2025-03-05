import styles from "./Topic.module.css";

const Topic = () => {
  return (
    <div className={styles.container}>
      <div className={styles.flag}></div>
      <figure className={styles.topic}></figure>
    </div>
  );
};

export default Topic;
