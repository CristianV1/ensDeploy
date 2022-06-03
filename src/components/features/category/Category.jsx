import React from "react";
import { AiFillTag, AiOutlineClose } from "react-icons/ai";
import styles from "./Category.module.css";

const Category = ({ title, id, removeCategory }) => {
  return (
    <div className={styles.category__container}>
      <AiFillTag className={styles.tagIcon} />
      <span className={styles.title}>{title}</span>
      <AiOutlineClose
        onClick={() => {
          removeCategory(id);
        }}
        className={styles.closeBtn}
      />
    </div>
  );
};

export default Category;
