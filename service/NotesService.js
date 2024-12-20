const pool = require("../config/database");

const getAll = async (req, res) => {
  const [result] = await pool.query("select * from notes");
  return res.json(result);
};

const create = async (req, res) => {
  const { title, datetime, note } = req.body;

  if (!title || !datetime || !note) {
    return res.status(400).json({ message: "Semua field wajib diisi!" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)",
      [title, datetime, note],
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

  if (!id || !title || !datetime || !note) {
    return res.status(400).json({ message: "Semua field wajib diisi!" });
  }

  try {
    const [result] = await pool.query(
      "UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?",
      [title, datetime, note, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Catatan tidak ditemukan" });
    }

    const updatedNote = {
      id,
      title,
      datetime,
      note,
    };

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Terjadi kesalahan saat mengupdate catatan:", error);
    res.status(500).json({ message: "Gagal mengupdate catatan", error });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Catatan tidak ditemukan" });
    }

    const deletedNote = rows[0];

    await pool.query("DELETE FROM notes WHERE id = ?", [id]);

    res.status(200).json({
      message: "Catatan berhasil dihapus",
      deletedNote: {
        id: deletedNote.id,
        title: deletedNote.title,
        datetime: deletedNote.datetime,
        note: deletedNote.note,
      },
    });
  } catch (error) {
    console.error("Terjadi kesalahan saat menghapus catatan:", error);
    res.status(500).json({ message: "Gagal menghapus catatan", error });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Catatan tidak ditemukan!" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil catatan:", error);
    res.status(500).json({ message: "Gagal mengambil catatan", error });
  }
};


module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
