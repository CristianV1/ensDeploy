let baseUrl = "https://notesbackendapp.herokuapp.com/";

const getNotes = async () => {
  const response = await fetch(`${baseUrl}note/`);
  const notes = await response.json();

  return notes;
  //setNotes(notes);
};

const getActiveNotes = async () => {
  const response = await fetch(`${baseUrl}note/active`);
  const notes = await response.json();

  return notes;
};
const getArchivedNotes = async () => {
  const response = await fetch(`${baseUrl}note/archived`);
  const notes = await response.json();

  return notes;
  //setNotes(notes);
};

const getNoteCategories = async () => {
  const response = await fetch(`${baseUrl}note/`);
  const notes = await response.json();

  return notes;
  //setNotes(notes);
};

const createNewNote = async (note) => {
  await fetch(`${baseUrl}note/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: note.title,
      content: note.content,
      categories: note.categories,
    }),
  });
};

const archiveNote = async (id, archived) => {
  await fetch(`${baseUrl}note/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ archived: archived }),
  });
};

const editNote = async (id, note) => {
  await fetch(`${baseUrl}note/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: note.title,
      content: note.content,
      categories: note.categories,
    }),
  });
};

const deleteNote = async (noteId) => {
  await fetch(`${baseUrl}note/${noteId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

const noteServices = {
  createNewNote: createNewNote,
  deleteNote: deleteNote,
  archiveNote: archiveNote,
  getNotes: getNotes,
  editNote: editNote,
  getActiveNotes: getActiveNotes,
  getArchivedNotes: getArchivedNotes,
};

export default noteServices;
