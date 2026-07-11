const Note = require("../models/noteModel");
const User = require('../models/userModel');

const getAllNotes = (req, res) => {
    res.json({ message: "getAllUsers" });
};
const createNote = async (req, res) => {
    try {
        const { title, content, user } = req.body;
        const newNote = await Note.create({
            title: title,
            content: content,
            user: user,
        });

        res.status(201).json(newNote)
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
