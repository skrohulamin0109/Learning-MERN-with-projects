const Note = require("../models/noteModel");
const User = require("../models/userModel");

const getAllNotes = async (req, res) => {
    try {
        const userId = req.userId;
        const allNotes = await Note.find({ user: userId });

        if (allNotes.length === 0) {
            return res.status(200).json({ message: "No notes found." });
        }

        return res.status(200).json(allNotes);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
  
const createNote = async (req, res) => {
    try {
        const { title, content, user } = req.body;
        const newNote = await Note.create({
            title: title,
            content: content,
            user: user,
        });

        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ error: ` ${err.message}` });
    }
};

const getNoteById = (req, res) => {
    res.json({ message: "getNoteById" });
};
const updateNote = (req, res) => {
    res.json({ message: "updateNote" });
};
const deleteNote = (req, res) => {
    res.json({ message: "deleteNote" });
};

module.exports = {
    getAllNotes,
    createNote,
    getNoteById,
    updateNote,
    deleteNote,
};
