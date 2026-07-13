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

userRouter.route("/:userId").get(verifyToken, getAllNotes);
userRouter.route("/:userId/create-note").post(verifyToken, createNote);
userRouter
    .route("/userId/:noteId")
    .get(verifyToken, getNoteById)
    .put(verifyToken, updateNote)
    .delete(verifyToken, deleteNote);

module.exports = userRouter;
