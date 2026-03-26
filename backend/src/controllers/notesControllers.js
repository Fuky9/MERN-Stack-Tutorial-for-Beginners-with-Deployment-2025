export const getAllNotes = (req, res) => {
  res.status(200).send("You fetched all the notes");
};

export const createNote = (req, res) => {
  res.status(201).json({ message: "You created a note" });
};

export const updateNote = (req, res) => {
  res.status(200).json({ message: "You updated a note" });
};

export const deleteNote = (req, res) => {
  res.status(200).json({ message: "You deleted a note" });
};
