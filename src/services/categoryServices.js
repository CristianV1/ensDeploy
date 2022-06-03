let baseUrl = "https://notesbackendapp.herokuapp.com/";

const getCategories = async () => {
  const response = await fetch(`${baseUrl}category/`);
  const categories = await response.json();

  return categories;
  //setNotes(notes);
};

const createNewCategory = async (note) => {
  const response = await fetch(`${baseUrl}category/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: note.title, content: note.content }),
  });
};

const deleteCategory = async (noteId) => {
  await fetch(`${baseUrl}category/${noteId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

const findCategoryNotes = async (categoryId) => {
  const response = await fetch(`${baseUrl}category/getNotes/${categoryId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const categoryNotes = response.json();
  return categoryNotes;
};

const noteServices = {
  createNewCategory: createNewCategory,
  getCategories: getCategories,
  deleteCategory: deleteCategory,
  findCategoryNotes: findCategoryNotes,
};

export default noteServices;
