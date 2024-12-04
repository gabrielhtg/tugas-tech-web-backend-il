const express = require("express");
const bodyParser = require("body-parser");
const notesController = require("./controllers/NotesController");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Endpoint utama untuk mengecek status API
app.get("/", (req, res) => {
  res.send("User API is Running");
});

app.use("/api/notes", notesController);
app.use(express.static("public"));

// Jalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
