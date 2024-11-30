const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  h: { type: String, required: true },
  p: { type: String, required: true },
  img: { type: String, required: false },
});

const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  type: { type: String, required: true },
  sections: [SectionSchema],
});

const MythologySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: false },
  chapters: [CharacterSchema],
});

module.exports = mongoose.model("Mythology", MythologySchema);
