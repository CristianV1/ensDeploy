import noteServices from "../../../services/noteServices";

import { FaStickyNote } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { RiInboxArchiveFill, RiInboxUnarchiveFill } from "react-icons/ri";
import { useState } from "react";
import styles from "./Note.module.css";
import Category from "../category/Category";

/*============================================*/
/*Note*/
/*============================================*/

const Note = ({ note, counter, setCounter }) => {
  let { id, title, content, updatedAt, archived, categories } = note;

  let date = "";
  const [openDelete, setOpenDelete] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const formateDate = () => {
    let sliced = updatedAt.slice(0, 10).split("-");
    for (let i = sliced.length - 1; i >= 0; i--) {
      if (i == 0) {
        date += sliced[i];
      } else {
        date += sliced[i] + "/";
      }
    }
  };
  formateDate();

  return (
    <div className={styles.note__container}>
      {openDelete && (
        <DeleteNote
          counter={counter}
          setCounter={setCounter}
          setOpen={setOpenDelete}
          note={note}
        />
      )}
      {openEdit && (
        <EditNote
          counter={counter}
          setCounter={setCounter}
          setOpenEdit={setOpenEdit}
          note={note}
        />
      )}
      <FaStickyNote className={styles.note__iconNote} />

      <div className={styles.note__infoContainer}>
        <h4>{title}</h4>
        <span>Last edited: {date}</span>
      </div>
      <div className={styles.note__icons__container}>
        {archived ? (
          <RiInboxUnarchiveFill
            onClick={() => {
              noteServices.archiveNote(id, false).then(() => {
                setCounter(counter + 1);
              });
            }}
          />
        ) : (
          <RiInboxArchiveFill
            onClick={() => {
              noteServices.archiveNote(id, true).then(() => {
                setCounter(counter + 1);
              });
            }}
          />
        )}
        <BsPencilFill
          onClick={() => {
            setOpenEdit(true);
          }}
        />
        <FaTrashAlt
          onClick={() => {
            setOpenDelete(true);
          }}
        />
      </div>
    </div>
  );
};

/*============================================*/
/*Delete note modal*/
/*============================================*/

export const DeleteNote = ({ setCounter, counter, setOpen, note }) => {
  let { id } = note;
  return (
    <div
      onClick={(e) => {
        /* if (e.target.className.includes("father")) {
          //if uncomment this line  the onclick function will close the delete window when is clicked outside the form setOpen(false);
        }*/
      }}
      className={styles.delete__container__dark + " father"}
    >
      <div className={styles.delete__container}>
        <h3>Are you sure you want to delete this note?</h3>
        <div className={styles.delete__buttons__container}>
          <input
            value={"Yes"}
            onClick={() => {
              noteServices.deleteNote(id).then(() => {
                setCounter(counter + 1);
              });

              setOpen(false);
            }}
            type="button"
          />
          <input
            value={"No"}
            onClick={() => {
              setOpen(false);
            }}
            type="button"
          />
        </div>
      </div>
    </div>
  );
};

/*============================================*/
/*Edit note modal*/
/*============================================*/

export const EditNote = ({ note, setCounter, counter, setOpenEdit }) => {
  let { title, id, content, categories } = note;
  const [inputs, setInputs] = useState({
    title: title,
    content: content,
    newCategory: "",
    categories: [...categories],
  });

  const removeCategory = (id) => {
    setInputs((inputs) => ({
      ...inputs,
      categories: inputs.categories.filter((category, idx) => idx !== id),
    }));
  };

  const createLocalCategory = () => {
    setInputs((inputs) => ({
      ...inputs,
      categories: [...inputs.categories, { title: inputs.newCategory }],
    }));
  };

  const onChangeInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submit = () => {
    if (inputs.title.length > 0) {
      noteServices.editNote(id, inputs).then(() => {
        setCounter(counter + 1);
        setOpenEdit(false);
      });
    }
  };
  return (
    <div
      onClick={(e) => {
        /*if (e.target.className.includes("father")) {
          //if uncomment this line  the onclick function will close the delete window when is clicked outside the form setOpenEdit(false);;
        }*/
      }}
      className={styles.editNote__container__dark + " father"}
    >
      <div className={styles.editNote__container}>
        <h4 className={styles.editNote__title}>Edit note</h4>
        <div className={styles.editNote__inputs__container}>
          <label>title</label>
          <input value={inputs.title} name="title" onChange={onChangeInput} />

          <label>content</label>
          <textarea
            value={inputs.content}
            name="content"
            onChange={onChangeInput}
          />
        </div>
        <label>Categories:</label>
        <div className={styles.categories__container}>
          {inputs.categories.map((title, idx) => {
            return (
              <Category
                key={idx}
                id={idx}
                title={title.title}
                removeCategory={removeCategory}
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

        <div className={styles.editNote__buttons__container}>
          <input
            value={"Cancel"}
            onClick={() => {
              setOpenEdit(false);
            }}
            type="button"
          />
          <input
            value={"Save"}
            onClick={() => {
              submit();
            }}
            type="button"
          />
        </div>
      </div>
    </div>
  );
};

export default Note;
