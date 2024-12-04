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

// Ensure uniqueness of the name field within the chapters array
CharacterSchema.pre("save", function (next) {
  const characterNames = this.name; // Check this character's name

  // Ensure that the name is unique within the entire mythology's chapters
  if (this.isNew || this.isModified()) {
    this.constructor.find(
      { "chapters.name": characterNames },
      (err, existingCharacters) => {
        if (existingCharacters.length > 0) {
          return next(
            new Error("Character name must be unique within the Mythology.")
          );
        }
        next();
      }
    );
  } else {
    next();
  }
});

const MythologySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  chapters: [CharacterSchema],
});

// Ensure index for uniqueness on the "name" field of the Mythology schema
MythologySchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("Mythology", MythologySchema);
