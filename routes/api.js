const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

router.get("/notes", (req, res) => {
  const allNotes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
  );

  res.json(allNotes);
});

router.post("/notes", (req, res) => {
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  const allNotes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
  );

  allNotes.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(allNotes),
    "utf8"
  );
  res.json(newNote);
});

router.delete("/notes/:id", (req, res) => {
  const allNotes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
  );
  const newNotes = allNotes.filter((note) => note.id !== req.params.id);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(newNotes),
    "utf8"
  );
  res.json({ ok: true });
});

module.exports = router;
