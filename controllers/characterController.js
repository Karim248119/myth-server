const Mythology = require("../models/Mythology");

// Add a character to a specific mythology
const addCharacter = async (req, res) => {
  const { mythologyName } = req.params; // Get mythology name
  const characterData = req.body;

  try {
    const mythology = await Mythology.findOne({ name: mythologyName }); // Find mythology by name
    if (!mythology) {
      return res.status(404).json({ message: "Mythology not found" });
    }

    // Check if a character with the same name already exists in the mythology's chapters
    const existingCharacter = mythology.chapters.find(
      (char) => char.name === characterData.name
    );

    if (existingCharacter) {
      return res
        .status(400)
        .json({
          message: "Character name must be unique within the Mythology.",
        });
    }

    if (Array.isArray(characterData)) {
      // If an array of characters is sent, push them all
      mythology.chapters.push(...characterData);
    } else {
      // If a single character is sent, push it
      mythology.chapters.push(characterData);
    }

    mythology.updatedAt = new Date();
    await mythology.save();

    res
      .status(200)
      .json({ message: "Characters added successfully", mythology });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding characters", error: error.message });
  }
};

const getCharacterByName = async (req, res) => {
  const { mythologyName, characterName } = req.params;

  try {
    const mythology = await Mythology.findOne({ name: mythologyName }); // Find mythology by name
    if (!mythology) {
      return res.status(404).json({ message: "Mythology not found" });
    }

    const character = mythology.chapters.find(
      (char) => char.name === characterName
    );

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.status(200).json(character);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving character", error: error.message });
  }
};

// Delete a character
const deleteCharacter = async (req, res) => {
  const { mythologyName, characterName } = req.params;

  try {
    const mythology = await Mythology.findOne({ name: mythologyName }); // Find mythology by name
    if (!mythology) {
      return res.status(404).json({ message: "Mythology not found" });
    }

    const characterIndex = mythology.chapters.findIndex(
      (char) => char.name === characterName
    );

    if (characterIndex === -1) {
      return res.status(404).json({ message: "Character not found" });
    }

    mythology.chapters.splice(characterIndex, 1);
    mythology.updatedAt = new Date();
    await mythology.save();

    res.status(200).json({
      message: "Character deleted successfully",
      mythology,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting character", error: error.message });
  }
};

// Update a character
const updateCharacter = async (req, res) => {
  const { mythologyName, characterName } = req.params;
  const characterData = req.body;

  try {
    const mythology = await Mythology.findOne({ name: mythologyName }); // Find mythology by name
    if (!mythology) {
      return res.status(404).json({ message: "Mythology not found" });
    }

    const character = mythology.chapters.find(
      (char) => char.name === characterName
    );

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    // Update character fields
    Object.assign(character, characterData);
    mythology.updatedAt = new Date();
    await mythology.save();

    res.status(200).json({
      message: "Character updated successfully",
      mythology,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating character", error: error.message });
  }
};

module.exports = {
  addCharacter,
  deleteCharacter,
  updateCharacter,
  getCharacterByName,
};
