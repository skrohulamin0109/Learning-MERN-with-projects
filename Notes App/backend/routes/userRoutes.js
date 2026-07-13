const express = require("express");
const userRouter = express.Router();
const {
    getAllNotes,
    createNote,
    getNoteById,
    updateNote,
    deleteNote,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/authMiddleware");

userRouter.route("/:userId/notes").get(verifyToken, getAllNotes);
userRouter.route("/:userId/notes/create-note").post(verifyToken, createNote);
userRouter
    .route("/:userId/notes/:noteId")
    .get(verifyToken, getNoteById)
    .put(verifyToken, updateNote)
    .delete(verifyToken, deleteNote);

module.exports = userRouter;
