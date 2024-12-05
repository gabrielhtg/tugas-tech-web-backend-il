const pool = require("../config/database");

const getAll = async (req, res) => {};

const create = async (req, res) => {
  const { title, datetime, note } = req.body;

  if (!title || !datetime || !note) {
    return res.status(400).json({ message: "Semua field wajib diisi!" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)",
      [title, datetime, note]
    );

    const newNote = {
      id: result.insertId,
      title,
      datetime,
      note,
    };

    res.status(201).json(newNote);
  } catch (error) {
    console.error("Terjadi kesalahan saat menambahkan catatan:", error);
    res.status(500).json({ message: "Gagal membuat catatan", error });
  }
};

module.exports = {
  create,
};

const getById = async (req, res) => {};

const remove = async (req, res) => {};

const update = async (req, res) => {};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
