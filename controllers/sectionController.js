const Mythology = require("../models/Mythology");

// Add a section to a specific character
const addSection = async (req, res) => {
  const { mythologyId, characterName } = req.params;
  const sections = Array.isArray(req.body) ? req.body : [req.body]; // Convert to an array if not already

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

    // Add sections to the character
    character.sections.push(...sections);
    mythology.updatedAt = new Date();
    await mythology.save();

    res.status(200).json({ message: "Sections added successfully", character });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding sections", error: error.message });
  }
};

//update

const updateSection = async (req, res) => {
  const { mythologyId, characterName, sectionId } = req.params;
  const sectionData = req.body;

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

    const section = character.sections.find(
      (sec) => sec._id.toString() === sectionId
    );
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    // Update section fields
    Object.assign(section, sectionData);
    mythology.updatedAt = new Date();
    await mythology.save();

    res.status(200).json({
      message: "Section updated successfully",
      updatedSection: section,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating section", error: error.message });
  }
};

//delete
const deleteSection = async (req, res) => {
  const { mythologyId, characterName, sectionId } = req.params;

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

    const sectionIndex = character.sections.findIndex(
      (sec) => sec._id.toString() === sectionId
    );
    if (sectionIndex === -1) {
      return res.status(404).json({ message: "Section not found" });
    }

    // Remove the section from the array
    character.sections.splice(sectionIndex, 1);
    mythology.updatedAt = new Date();
    await mythology.save();

    res.status(200).json({
      message: "Section deleted successfully",
      character,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting section", error: error.message });
  }
};

// Delete all sections for a specific character
const deleteAllSections = async (req, res) => {
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

    // Clear the sections array
    character.sections = [];
    mythology.updatedAt = new Date();
    await mythology.save();

    res.status(200).json({
      message: "All sections deleted successfully",
      character,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting all sections", error: error.message });
  }
};

module.exports = {
  addSection,
  deleteSection,
  updateSection,
  deleteAllSections,
};
