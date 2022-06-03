import React, { useEffect, useRef, useMemo, useState } from "react";
import Note from "../../features/note/Note";
import { Link } from "react-router-dom";
import noteServices from "../../../services/noteServices";
import categoryServices from "../../../services/categoryServices";
import styles from "./ActiveNotes.module.css";
import Category from "../../features/category/Category";

/*============================================*/
/*Active notes page*/
/*============================================*/

const ActiveNotes = () => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [counter, setCounter] = useState(0); //variable to render the page after something happeds, example creating,deleting etc
  const [openCreateNewNote, setOpenCreateNewNote] = useState(false);

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      setCounter(0);
      noteServices.getActiveNotes().then((notes) => {
        setNotes(notes);
        categoryServices.getCategories().then((categories) => {
          setCategories(categories);
        });
      });
      mounted.current = true;
    } else {
      noteServices.getActiveNotes().then((notes) => {
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
      <header>
        <nav className={styles.navbar}>
          {openCreateNewNote && (
            <CreateNote
              counter={counter}
              setCounter={setCounter}
              setCreateNewNote={setOpenCreateNewNote}
            />
          )}
          <h3 className={styles.navbar__title}>My notes</h3>
          <input
            className={styles.navbar__createButton}
            type="button"
            value="Create note"
            onClick={() => {
              setOpenCreateNewNote(true);
            }}
          />
          <Link className={styles.navbar__archivedLink} to={"/archived"}>
            Archived notes
          </Link>
        </nav>
      </header>

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
              !note.archived && (
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

/*============================================*/
/*Create new note modal*/
/*============================================*/

export const CreateNote = ({ counter, setCounter, setCreateNewNote }) => {
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    newCategory: "",
    categories: [],
  });

  const onChangeInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    if (inputs.title.length > 0) {
      noteServices.createNewNote(inputs).then(() => {
        setCounter(counter + 1);
      });
    }
    setCreateNewNote(false);
  };

  const removeCategory = (id) => {
    setInputs((inputs) => ({
      ...inputs,
      categories: inputs.categories.filter((category, idx) => idx !== id),
    }));
  };

  const createLocalCategory = () => {
    setInputs((inputs) => ({
      ...inputs,
      categories: [...inputs.categories, inputs.newCategory],
    }));
  };

  return (
    <div
      onClick={(e) => {
        if (e.target.className.includes("father")) {
          //if uncomment this line  the onclick function will close the delete window when is clicked outside the form setCreateNewNote(false);
        }
      }}
      className={styles.createNewNote__container__dark + " father"}
    >
      <div className={styles.createNewNote__container}>
        <h4 className={styles.createNewNote__title}>Create note</h4>
        <form onSubmit={submit}>
          <div className={styles.createNewNote__inputs__container}>
            <label>title</label>
            <input value={inputs.title} onChange={onChangeInput} name="title" />

            <label>content</label>
            <textarea
              value={inputs.content}
              onChange={onChangeInput}
              name="content"
            />

            <label>Categories:</label>
            <div className={styles.categories__container}>
              {inputs.categories.map((category, idx) => {
                return (
                  <Category
                    key={idx}
                    id={idx}
                    removeCategory={removeCategory}
                    title={category}
                  />
                );
              })}
            </div>
            <div className={styles.createNewCategory__container}>
              <input
                value={inputs.newCategory}
                name="newCategory"
                onChange={onChangeInput}
                className={styles.createNewCategory__input}
                placeholder="new category"
                type={"text"}
              />
              <input
                className={styles.createNewCategory__button}
                type="button"
                onClick={(e) => {
                  createLocalCategory();
                }}
                value={"add"}
              />
            </div>
            <div className={styles.createNewNote__categories__container}></div>
          </div>
          <div className={styles.createNewNote__buttons__container}>
            <input
              value={"Cancel"}
              onClick={() => {
                setCreateNewNote(false);
              }}
              type="button"
            />
            <input value={"Save"} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActiveNotes;
