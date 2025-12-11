import { Router } from "express"
import { addNote, deleteNote, getAllNotes, getNote, updateNote } from "../controllers/mainController.ts"
import { validateIdParam, validateNoteBody, validateNoteTitle } from "../utils/validatorFunctions.ts"

const router = Router()

router.get("/get-note/:id", validateIdParam(), getNote)
router.get("/get-all-notes", getAllNotes)
router.post("/add-note", validateNoteBody(), validateNoteTitle(), addNote)
router.put("/update-note/:id", validateIdParam(), validateNoteBody(), validateNoteTitle(), updateNote)
router.delete("/delete-note/:id", validateIdParam(), deleteNote)

export default router
