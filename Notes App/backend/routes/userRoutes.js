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

userRouter.route("/").get(verifyToken, getAllNotes);
userRouter.route("/create-note").post(verifyToken, createNote);
userRouter
    .route("/:Id")
    .get(verifyToken, getNoteById)
    .put(verifyToken, updateNote)
    .delete(verifyToken, deleteNote);

module.exports = userRouter;
