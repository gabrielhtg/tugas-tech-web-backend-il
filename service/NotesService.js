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

const update = async (req, res) => {
  const { id } = req.params;
  const { title, datetime, note } = req.body;

  if (!title || !datetime || !note) {
    return res.status(400).json({ message: "Semua field wajib diisi!" });
  }

  try {
    const [noteExists] = await pool.query("SELECT * FROM notes WHERE id = ?", [
      id,
    ]);
    if (noteExists.length === 0) {
      return res.status(404).json({ message: "Catatan tidak ditemukan!" });
    }

    const [result] = await pool.query(
      "UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?",
      [title, datetime, note, id]
    );

    if (result.affectedRows === 0) {
      return res.status(500).json({ message: "Gagal memperbarui catatan" });
    }

    res.status(200).json({
      message: "Catatan berhasil diperbarui",
      updatedNote: { id, title, datetime, note },
    });
  } catch (error) {
    console.error("Terjadi kesalahan saat memperbarui catatan:", error);
    res.status(500).json({ message: "Gagal memperbarui catatan", error });
  }
};

module.exports = {
  create,
  update,
};

const getById = async (req, res) => {};

const remove = async (req, res) => {};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
