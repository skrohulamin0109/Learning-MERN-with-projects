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
        const { title, content } = req.body;
        const user = req.userId;
        const newNote = await Note.create({
            title: title,
            content: content,
            user: user,
        });

        return res.status(201).json(newNote);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getNoteById = async (req, res) => {
    try {
        const { noteId } = req.params;
        const note = await Note.findById(noteId);

        if (!note) return res.status(400).json({ message: "Bad Request." });

        if (note.user.toString() !== req.userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        res.status(200).json(note);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const updateNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const userId = req.userId;
        const { title, content } = req.body; // new updated title and content

        const note = await Note.findById(noteId);
        if (!note) return res.status(400).json({ message: "Bad Request." });

        if (note.user.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        note.title = title;
        note.content = content;
        await note.save();

        return res.status(200).json(note);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const userId = req.userId;

        const note = await Note.findById(noteId);
        if (!note) return res.status(400).json({ message: "Bad Request." });

        if (note.user.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        await Note.deleteOne({ _id: noteId });

        return res.status(200).json("Note deleted Successfully.");
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllNotes,
    createNote,
    getNoteById,
    updateNote,
    deleteNote,
};
