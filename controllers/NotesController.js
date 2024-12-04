// controllers/UserController.js

const express = require("express");
const {
  getAll,
  create,
  getById,
  remove,
  update,
} = require("../service/NotesService"); // Pastikan import updateUser
const router = express.Router();

router.get("/", getAll);
router.post("/", create);
router.get("/:id", getById);
router.delete("/:id", remove);
router.put("/:id", update);

module.exports = router;
