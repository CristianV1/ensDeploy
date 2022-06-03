import noteServices from "../../../services/noteServices";
import React, { useEffect, useMemo, useState, useRef } from "react";
import Note from "../../features/note/Note";
import { Link } from "react-router-dom";
import styles from "./ArchivedNotes.module.css";

import categoryServices from "../../../services/categoryServices";

/*============================================*/
/*Active notes page*/
/*============================================*/
const getNotes = async (url, setNotes) => {
  const response = await fetch(url);
  const notes = await response.json();

  setNotes(notes);
};

const ArchivedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [counter, setCounter] = useState(0); //variable to render the page after something happeds, example creating,deleting etc

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      setCounter(0);
      noteServices.getArchivedNotes().then((notes) => {
        setNotes(notes);
        categoryServices.getCategories().then((categories) => {
          setCategories(categories);
        });
      });
      mounted.current = true;
    } else {
      noteServices.getArchivedNotes().then((notes) => {
        setNotes(notes);
        categoryServices.getCategories().then((categories) => {
          setCategories(categories);
        });
      });
    }
  }, [counter]);

  const onCategoryChange = (id) => {
    if (id != 0) {
      categoryServices.findCategoryNotes(id).then((notes) => {
        !notes ? setNotes([]) : setNotes(notes);
      });
    } else {
      setCounter(counter + 1);
    }
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <h3 className={styles.navbar__title}>Archived Notes</h3>

        <Link to={"/"}>Go back to unarchived notes</Link>
      </nav>
      <main>
        <div className={styles.filter__container}>
          <span className={styles.filter__span}>Categories filter: </span>
          <select
            className={styles.filter__select}
            onChange={(e) => {
              onCategoryChange(e.target.value);
            }}
          >
            <option value={0}>none</option>
            {categories.map((category, idx) => (
              <option key={idx} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.notes__container}>
          {notes.map((note, idx) => {
            return (
              note.archived && (
                <Note
                  key={idx}
                  counter={counter}
                  setCounter={setCounter}
                  note={note}
                />
              )
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ArchivedNotes;
