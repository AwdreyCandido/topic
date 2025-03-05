import {
  HiMiniPlus,
  HiOutlineDocumentPlus,
  HiOutlineFolderPlus,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import styles from "./FloatingButton.module.css";

const FloatingButton = ({onClick}) => {
  return (
    <button className={styles.floating}>
      <div onClick={onClick} className={styles.action}>
        <HiMiniPlus />
      </div>
      <div className={styles.action}>
        <HiOutlinePencilSquare />
      </div>
      <div className={styles.action}>
        {/* <HiOutlineDocumentPlus /> */}
        <HiOutlineFolderPlus />
      </div>
    </button>
  );
};

export default FloatingButton;
