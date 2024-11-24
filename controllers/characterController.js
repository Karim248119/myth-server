const Mythology = require("../models/Mythology");

// Add a character to a specific mythology
const addCharacter = async (req, res) => {
  const { mythologyId } = req.params;
  const characterData = req.body;

  try {
    const mythology = await Mythology.findById(mythologyId);
    if (!mythology) {
      return res.status(404).json({ message: "Mythology not found" });
    }

    mythology.chapters.push(characterData);
    mythology.updatedAt = new Date();
    await mythology.save();

    res
      .status(200)
      .json({ message: "Character added successfully", mythology });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding character", error: error.message });
  }
};

const getCharacterByName = async (req, res) => {
  const { mythologyId, characterName } = req.params;

  try {
    const mythology = await Mythology.findById(mythologyId);
    if (!mythology) {
      return res.status(404).json({ message: "Mythology not found" });
    }

    const character = mythology.chapters.find(
      (char) => char.name === characterName
    );

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.status(200).json({
      message: "Character found successfully",
      character,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving character", error: error.message });
  }
};

//delete
const deleteCharacter = async (req, res) => {
  const { mythologyId, characterName } = req.params;

  try {
    const mythology = await Mythology.findById(mythologyId);
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

//update
const updateCharacter = async (req, res) => {
  const { mythologyId, characterName } = req.params;
  const characterData = req.body;

  try {
    const mythology = await Mythology.findById(mythologyId);
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
